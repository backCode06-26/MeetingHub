package com.project.backend.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;


@Table(name="timeslots")
@Entity

@Getter
public class Timeslot {
    @Id
    @Column(name="time", nullable = false)
    private Double time;
}
