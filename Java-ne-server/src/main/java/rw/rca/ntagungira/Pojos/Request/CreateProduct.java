package rw.rca.ntagungira.Pojos.Request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Data
public class CreateProduct {
    @NotBlank
    private String name;
    @NotBlank
    private String type;
    @NotBlank
    private String price;
    @NotNull
    private MultipartFile image;
}
