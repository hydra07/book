package com.restfull.api.dtos.book;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TypeDTO {
    private Long id;
    private String name;
    private boolean license;
    private String description;

    @Override
    public String toString(){
        return "TypeDTO{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", license='" + license + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}
