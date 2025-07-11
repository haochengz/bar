import UserModel, { UserCreationAttributes } from './user.model';
import { FindOptions } from 'sequelize';

export async function findByUsername(username: string): Promise<UserModel | null> {
  return UserModel.findByUsername(username);
}

export async function createUser(userData: UserCreationAttributes): Promise<UserModel> {
  return UserModel.createUser(userData);
}

export async function findAllUsers(options?: FindOptions): Promise<UserModel[]> {
  return UserModel.findAllUsers(options);
}
