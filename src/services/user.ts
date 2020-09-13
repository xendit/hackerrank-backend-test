// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserRepo {}

export class UserService {
    private readonly userRepository: IUserRepo;

    public constructor(userRepository: IUserRepo) {
        this.userRepository = userRepository;
    }
}
