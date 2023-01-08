export type TUser = {
  id: number | null;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  phone: string;
  dateOfBirth: string;
  bio: string;
  creatorType: string;
  contentType: string;
  invCode: string;
  profileImgUrl: string;
  bannerImgUrl: string;
  lastActive: string;
  deletedAt: string;
};

export type TAuth = {
  id: number | null;
  userId: number | null;
  verified: boolean;
  verifiedAt: string;
  passwordDigest: string;
  createdAt: string;
  updatedAt: string;
};

export type UserDevice = {
  id: number | null;
  deviceId: number | null;
  userId: number | null;
  lastLoginTime: string;
  createdAt: string;
  updatedAt: string;
  verifiedAt: string;
  verified: boolean;
};

export type TRegisterUser = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  deviceId: string;
  phone: string;
  dateOfBirth: string;
  bio: string;
  creatorType: string;
  contentType: string;
  inviteCode: string;
};
