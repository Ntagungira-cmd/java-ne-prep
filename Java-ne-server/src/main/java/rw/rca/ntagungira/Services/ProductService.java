package rw.rca.ntagungira.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rw.rca.ntagungira.Models.Product;
import rw.rca.ntagungira.Models.Purchased;
import rw.rca.ntagungira.Models.Quantity;
import rw.rca.ntagungira.Pojos.Request.CreateProduct;
import rw.rca.ntagungira.Pojos.Request.CreateQuantity;
import rw.rca.ntagungira.Repositories.ProductRepository;
import rw.rca.ntagungira.Repositories.PurchasedRepository;
import rw.rca.ntagungira.Repositories.QuantityRepository;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class ProductService {
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private QuantityRepository quantityRepository;
    @Autowired
    private PurchasedRepository purchasedRepository;
    @Autowired
    private CloudinaryService cloudinaryService;


    public Product createProduct(CreateProduct product) throws IOException {
        String img = cloudinaryService.uploadImage(product.getImage());
        Product newProduct = new Product();
        newProduct.setName(product.getName());
        newProduct.setPrice(product.getPrice());
        newProduct.setType(product.getType());
        newProduct.setImage(img);
        return productRepository.save(newProduct);
    }

    public Product getProductByCode(Integer code){
        //UUID uuid = UUID.fromString(code);
        return productRepository.findDistinctByCode(code);
    }

    public Quantity createQuantity(CreateQuantity quantity){
        Product product = getProductByCode(quantity.getProductCode());
        System.out.println(product.getCode());
        Quantity newQuantity = new Quantity();
        newQuantity.setProduct(product);
        newQuantity.setQuantity(quantity.getQuantity());
        newQuantity.setOperation("ADD");
        product.setQuantity(newQuantity);
        return productRepository.save(product).getQuantity();
    }

    public List<Product> getAllProducts(){
        return productRepository.findAll();
    }

    public Purchased purchase(Integer productId, int quantity) {
        Product product = getProductByCode(productId);
        Quantity quantity1 = product.getQuantity();
        if(quantity1.getQuantity() < quantity){
            throw new RuntimeException("Not enough quantity");
        }
        quantity1.setQuantity(quantity1.getQuantity() - quantity);
        Purchased purchased = new Purchased();
        purchased.setProduct(product);
        purchased.setQuantity(quantity);
        purchased.setTotal(Integer.parseInt(product.getPrice()) * quantity);
        product.setQuantity(quantity1);
        productRepository.save(product);
        return purchasedRepository.save(purchased);
    }
}
