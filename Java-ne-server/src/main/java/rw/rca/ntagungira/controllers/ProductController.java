package rw.rca.ntagungira.controllers;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.annotation.AccessType;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import rw.rca.ntagungira.Models.Product;
import rw.rca.ntagungira.Models.Purchased;
import rw.rca.ntagungira.Models.Quantity;
import rw.rca.ntagungira.Pojos.Request.CreateProduct;
import rw.rca.ntagungira.Pojos.Request.CreateQuantity;
import rw.rca.ntagungira.Pojos.Request.PurchaseRequest;
import rw.rca.ntagungira.Pojos.Response.MessageResponse;
import rw.rca.ntagungira.Services.ProductService;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/product")
public class ProductController {
    @Autowired
    private ProductService productService;

    @PostMapping(value = "/add", consumes = {"multipart/form-data"})
    public Product createProduct(@Valid CreateProduct product, @RequestParam("image") MultipartFile file) throws IOException {
        product.setImage(file);
        return productService.createProduct(product);
    }

    @PostMapping("/quantity")
    public Quantity createQuantity(@Valid @RequestBody CreateQuantity quantity){
        return productService.createQuantity(quantity);
    }


    @GetMapping("/all")
    @PreAuthorize("hasRole('ROLE_USER') or hasRole('ROLE_ADMIN')")
    public Iterable<Product> getAllProducts(HttpServletRequest req){
        return productService.getAllProducts();
    }


    @PostMapping("/purchase")
    public ResponseEntity<Object> purchase(@RequestBody List<PurchaseRequest> purchaseRequest) {
        List<Purchased> purchases = new ArrayList<>();
        for (PurchaseRequest purchased : purchaseRequest) {
            Purchased product = productService.purchase(purchased.getProductId(), purchased.getQuantity());
            purchases.add(product);
        }
        if(purchases.isEmpty()){
            return new ResponseEntity<>(new MessageResponse(HttpStatus.NO_CONTENT, "failed to purchase"), HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(purchases, HttpStatus.OK);
    }
}
