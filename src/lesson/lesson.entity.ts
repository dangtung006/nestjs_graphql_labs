import { Column, ObjectIdColumn, PrimaryColumn } from "typeorm";

export class Lesson {
    @ObjectIdColumn()
    _id : string;

    @PrimaryColumn()
    id : string;

    @Column()
    name : string;

    @Column()
    startDate : string;

    @Column()
    endDate : string
}