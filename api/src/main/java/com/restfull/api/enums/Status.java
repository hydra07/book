package com.restfull.api.enums;

public enum Status {
    ONGOING("Đang tiến hành"),
    COMPLETED("Đã hoàn thành"),
    DISCONTINUED("Đã ngừng");

    private final String value;

    Status(String value) {
        this.value = value;
    }
}
