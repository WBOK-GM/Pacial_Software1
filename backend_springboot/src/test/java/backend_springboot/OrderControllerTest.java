package backend_springboot;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
class OrderControllerTest {
    MockMvc mockMvc = MockMvcBuilders.standaloneSetup(new OrderController()).build();
    ObjectMapper objectMapper = new ObjectMapper();

    @Test
    @DisplayName("Debería aceptar pedido válido")
    void addOrderOk() throws Exception {
        Order o = new Order();
        o.setName("Cafe");
        o.setSize("Small");
        mockMvc.perform(post("/orders").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(o)))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("Debe rechazar pedido sin nombre")
    void addOrderFailNoName() throws Exception {
        Order o = new Order();
        o.setName("");
        o.setSize("Small");
        mockMvc.perform(post("/orders").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(o)))
                .andExpect(status().is5xxServerError());
    }

    @Test
    @DisplayName("Debe rechazar pedido sin tamaño")
    void addOrderFailNoSize() throws Exception {
        Order o = new Order();
        o.setName("Cafe");
        o.setSize("");
        mockMvc.perform(post("/orders").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(o)))
                .andExpect(status().is5xxServerError());
    }

    @Test
    @DisplayName("Debe rechazar si bebida no existe (mock)")
    void addOrderFailNoBebidaMock() throws Exception {
        OrderController ctrl = Mockito.spy(new OrderController());
        Mockito.doThrow(new RuntimeException("Bebida no disponible")).when(ctrl).createOrder(Mockito.any(Order.class));
        MockMvc mv = MockMvcBuilders.standaloneSetup(ctrl).build();
        Order o = new Order();
        o.setName("Agua");
        o.setSize("Medio");
        mv.perform(post("/orders").contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(o)))
                .andExpect(status().is5xxServerError());
    }
}
