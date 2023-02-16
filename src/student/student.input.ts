import { Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';

export class Student {
    _id: string;
    id : string;
    firstName : string;
    lastName : string;
}