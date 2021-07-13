import { UserName } from "./UserName";
import { UserEmail } from "./UserEmail";
import { UserPassword } from "./UserPassword";
import { UserId } from "./userId";
import { JWTToken, RefreshToken } from "./jwt";

import { AggregateRoot } from "../../Shared/domain/AggregateRoot";
import { UniqueEntityID } from "../../Shared/domain/UniqueEntityID";
import { UserCreatedDomainEvent } from "./UserCreatedDomainEvent";

type UserProps = {
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  accessToken?: JWTToken;
  refreshToken?: RefreshToken;
  isDeleted?: boolean;
};

export class User extends AggregateRoot<UserProps> {
  get userId(): UserId {
    return UserId.create(this._id);
  }

  get name(): UserName {
    return this.props.name;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get accessToken (): string {
    return this.props.accessToken;
  }

  get isDeleted (): boolean {
    return this.props.isDeleted;
  }

  get refreshToken (): RefreshToken {
    return this.props.refreshToken
  }

  public isLoggedIn (): boolean {
    return !!this.props.accessToken && !!this.props.refreshToken
  }

  private constructor(userProps: UserProps, id?: UniqueEntityID) {
    super(userProps, id);
  }

  static create(userProps: UserProps, id?: UniqueEntityID): User {
    const user = new User(userProps, id);
    const isNewUser = !!id === false;

    if (isNewUser) {
      user.record(
        new UserCreatedDomainEvent({
          id: user.id.toString(),
          name: user.name.props.value,
          email: user.name.props.value,
        })
      );
    }
    return user;
  }

  static fromPrimitives(plainData: { id: string; name: string; email: string; password: string }): User {
    return User.create(
      {
        name: UserName.create({ value: plainData.name }),
        email: UserEmail.create({ value: plainData.email }),
        password: UserPassword.create({ value: plainData.password }),
      },
      new UniqueEntityID(plainData.id)
    );
  }

  toPrimitives() {
    return {
      id: this.id.toString(),
      name: this.name.props.value,
      email: this.email.props.value,
      password: this.password.props.value,
    };
  }
}
