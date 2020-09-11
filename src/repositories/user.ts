import { EntityRepository, Repository } from 'typeorm';
import { User } from 'src/entities/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    findByName(firstName: string, lastName: string) {
        return this.createQueryBuilder('user')
            .where('user.firstName = :firstName', { firstName })
            .andWhere('user.lastName = :lastName', { lastName })
            .getMany();
    }
}
