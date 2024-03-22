package com.demo.app.controller;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.demo.app.model.ImageModel;
import com.demo.app.model.Product;
import com.demo.app.services.ProductService;



@CrossOrigin(origins="http://localhost:4200")
@RestController
public class ProductController 
{
	@Autowired
	private ProductService productService;
	
	
	//Add New Product + Image file
	@PreAuthorize("hasRole('Admin')")
	@PostMapping(value = {"/addNewProduct"},consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
	public Product addNewProduct(@RequestPart("product") Product product,
			@RequestPart("imageFile")MultipartFile[] file) {
		try {
			Set<ImageModel> images = uploadImage(file);
			product.setProductImages(images);
			return productService.addNewProduct(product);
		} catch (Exception e) {
			System.out.println(e.getMessage());
			return null;
		}
		
	}
	
	//	Upload Images
	public Set<ImageModel> uploadImage(MultipartFile[] multipartFiles) throws IOException {
		Set<ImageModel>imageModels = new HashSet<>();
		
		for(MultipartFile file :multipartFiles) {
			ImageModel imageModel = new ImageModel(
					file.getOriginalFilename(),
					file.getContentType(),
					file.getBytes());
			
			imageModels.add(imageModel);
		}
		return imageModels;
	}
	
	//Get All products from Database

	@GetMapping({"/getAllProducts"})
	public List<Product> getAllProducts(@RequestParam(defaultValue = "0") int pageNumber ,@RequestParam(defaultValue = "") String searchKey){
		List<Product> result = productService.getAllProducts(pageNumber,searchKey);
		System.out.println("Reesult size " + result.size());
		return result;
	}
	
//	@PreAuthorize("hasRole('Admin')")
	@GetMapping({"/getProductDetailsById/{productId}"})
	public Product getProductDetailsById(@PathVariable("productId")Integer productId) {
		return productService.getProductDetailsById(productId);
	}
	
	//
	@PreAuthorize("hasRole('Admin')")
	@DeleteMapping({"/deleteProductDetails/{productId}"})
	public void deleteProductDetails(@PathVariable("productId") Integer productId){
		productService.deleteProductDetails(productId);
	}
	
	@PreAuthorize("hasRole('User')")
	@GetMapping({"/getProductDetails/{isSingleProductCheckout}/{productId}"})
	public List<Product> getProductDetails(@PathVariable(name = "isSingleProductCheckout") boolean isSingleProductCheckout,
			@PathVariable(name = "productId")Integer productId) {
		
	 	return productService.getProductDetails(isSingleProductCheckout,productId);
		
	}
}
