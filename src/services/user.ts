import { DeleteResult, FindManyOptions } from 'typeorm';
import { User } from 'src/entities/user';

export interface IUserRepo {
    find(opts: FindManyOptions): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findByName(firstName: string, lastName: string): Promise<User[]>;
    save(user: User): Promise<User>;
    merge(user: User, updatedUser: User): User;
    delete(id: string): Promise<DeleteResult>;
}

export class UserService {
    private readonly userRepository: IUserRepo;

    public constructor(userRepository: IUserRepo) {
        this.userRepository = userRepository;
    }

    public async findAll(limit: number, offset: number): Promise<User[]> {
        return this.userRepository.find({ take: limit, skip: offset, order: { id: 'DESC' } });
    }

    public async findOne(id: string): Promise<User> {
        return this.userRepository.findOne(id);
    }

    public async findByName(firstName: string, lastName: string): Promise<User[]> {
        return this.userRepository.findByName(firstName, lastName);
    }

    public async create(user: User): Promise<User> {
        return this.userRepository.save(user);
    }

    public async update(id: string, updatedUser: User): Promise<User> {
        const user = await this.userRepository.findOne(id);
        this.userRepository.merge(user, updatedUser);
        return this.userRepository.save(user);
    }

    public async delete(id: string): Promise<any> {
        return this.userRepository.delete(id);
    }
}
