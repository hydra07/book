package com.restfull.api.enums;

import lombok.*;

@Getter
public enum Rate {
    ONE(1), TWO(2), THREE(3), FOUR(4), FIVE(5);

    private final int value;

    Rate(int value) {
        this.value = value;
    }

    public static Rate valueOf(int value){
        for (Rate rate : Rate.values()){
            if (rate.value == value){
                return rate;
            }
        }
        throw new IllegalArgumentException("Invalid rate value: " + value);
    }
}

