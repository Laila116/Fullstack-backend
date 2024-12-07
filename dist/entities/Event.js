"use strict";
/*
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne
  } from 'typeorm';
  
import {User} from './User';
  
  @Entity('events') // Der Name der Tabelle in der Datenbank
  export class Event {
    @PrimaryGeneratedColumn() // Generiert automatisch eine Primärschlüsselspalte
    id!: number;
  
    @Column()
    name: string;
  
    @Column()
    location: string;
  
    @Column('date') // 'date' für ein Datum ohne Uhrzeit
    date!: string;
  
    @Column('time') // 'time' für eine Uhrzeit ohne Datum
    time!: string;
  
    @Column('text', { nullable: true }) // Text ist optional
    description?: string;
  
    @CreateDateColumn() // Fügt ein Erstellungsdatum hinzu
    createdAt!: Date;
  
    @UpdateDateColumn() // Fügt ein Update-Datum hinzu, das bei jedem Update aktualisiert wird
    updatedAt!: Date;

    @ManyToOne(() => User, (user) => user) // Verknüpfung mit User muss über user.events
    user!: User;

    constructor(name: string, location: string, user: User) {
        this.name = name;
        this.location = location;
        this.user = user;
    }

  }
  */ 
