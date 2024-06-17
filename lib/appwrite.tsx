import { Client, Account, ID, Avatars, Databases, Query } from 'react-native-appwrite';

export const config = {
  endpoint: 'https://cloud.appwrite.io/v1',
  platform: 'com.jsm.aoravideodownloader',
  projectId: '666f2ddf001c9bff27f0',
  databaseId: '666f301f000879f5ab7b',
  userCollectionId: '666f304e0027186a87f1',
  videoCollectionId: '666f30880022563eb6f1',
  storageId: '666f33df001f128b3f5e',
}

let client;

client = new Client();
client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email: string, password: string, username: string) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    )

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    )

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error(error);
  }
}

export const signIn = async (email: string, password: string) => {
  try {
    return await account.createEmailPasswordSession(email, password);
  } catch (error: any) {
    throw new Error(error)
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}
