import { Column, Entity, Index, PrimaryColumn } from 'typeorm';

@Entity()
@Index(['id', 'secret'])
export default class Client {
    @PrimaryColumn({
        type: 'varchar',
        name: 'id'
    })
    id: string;

    @Column({
        type: 'varchar',
        name: 'secret'
    })
    secret: string;

    @Column({
        type: 'timestamp',
        default: new Date()
    })
    created: Date;
}
