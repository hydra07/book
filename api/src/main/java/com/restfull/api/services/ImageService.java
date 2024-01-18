package com.restfull.api.services;

import com.restfull.api.entities.Image;
import com.restfull.api.repositories.ImageRepository;
import com.restfull.api.utils.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ImageService {

    @Autowired
    private ImageRepository repository;

    public List<Image> getAllImages() { return repository.findAll(); }

    public Image getImageById(Long id) {
        return repository.findById(id).orElseThrow(
                () -> new NotFoundException("Image not found: " + id));
    }

    public Image getImageByPath(String path){
        return repository.findByPath(path);
    }

    public Image create(Image image) { return repository.save(image);}

    public Image update(Image image){
        Image _image = getImageById(image.getId());
        _image.setId(image.getId());
        _image.setPath(image.getPath());
        _image.setBook(image.getBook());
        return repository.save(_image);
    }

    public void delete(Long id) {
        Image image = getImageById(id);
        repository.delete(image);
    }
    
    public List<Image> getImageByString(List<String> images){
        List<Image> result = new ArrayList<>();
        images.forEach(image -> {
                    if (getImageByPath(image) == null) {
                        result.add(create(new Image(image)));
                    }else {
                        result.add(getImageByPath(image));
                    }});
        return result;
    }

}
