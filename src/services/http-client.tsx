import {
  IStatistic,
  ISettings,
  IUser,
  IUserData,
  IUserWord,
} from "../interface/interface";
import { Url, Methods, ResponseStatus } from '../const/const'

class HTTPClient {

  // Words

  async getWords(): Promise<void> {
    const data = await fetch(`${Url.DOMEN}/words"`)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async getChunkOfWords(pageNum: string, groupNum: string) {
    const data = await fetch(
      `${Url.DOMEN}/words/?page=${pageNum}&group=${groupNum}`
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async getWord(id: string) {
    const data = await fetch(`${Url.DOMEN}/words/${id}`)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  //Users
  async createUser (user: IUser) {
    try {
      const res = await fetch(`${Url.DOMEN}/users`, {
        method: Methods.POST,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (res.status === ResponseStatus.OK) {
        return res.json();
      }
      if (res.status === ResponseStatus.EXPECTATION_FAILED) {
        return ResponseStatus.EXPECTATION_FAILED;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }

  async getUser({ userId, token }: IUserData) {
    const data = await fetch(`${Url.DOMEN}/users/${userId}`, {
      method: `${Methods.GET}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async deleteUser({ userId, token }: IUserData) {
    const data = await fetch(`${Url.DOMEN}/users/${userId}`, {
      method: `${Methods.DELETE}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "content-type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async getNewUserToken(userId: string, token: string) {
    console.log("in getNewToken userId", userId);
    console.log("in getNewToken token", token);
    try {
      const res = await fetch(
        `${Url.DOMEN}/users/${userId}/tokens`,
        {
          method: Methods.GET,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      if (res.status === ResponseStatus.OK) {
        return res.json();
      }
    } catch (err) {
      console.log(err);
    }
  }

  // User Words

  async getAllUserWords({ userId, token }: IUserData) {
    const data = await fetch(`${Url.DOMEN}/users/${userId}/words`, {
      method: `${Methods.GET}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async createUserWord({ userId, token }: IUserData, userWord:IUserWord) {
    const data = await fetch(
      `${Url.DOMEN}/users/${userId}/words/${userWord.wordId}`,
      {
        method: `${Methods.POST}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userWord),
      }
    ).then((response) => {
      return response.json();
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }


  async getUserWord({ userId, token }: IUserData, wordId: string) {
    const data = await fetch(
      `${Url.DOMEN}/users/${userId}/words/${wordId}`,
      {
        method: `${Methods.GET}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    ).then((response) => {
      return response.json();
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async updateUserWord({ userId, token }: IUserData, userWord:IUserWord) {
    const data = await fetch(
      `${Url.DOMEN}/users/${userId}/words/${userWord.wordId}`,
      {
        method: `${Methods.PUT}`,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userWord),
      }
    ).then((response) => {
      return response.json();
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async deleteUserWord({ userId, token }: IUserData, userWord:IUserWord) {
    const data = await fetch(
      `${Url.DOMEN}/users/${userId}/words/${userWord.wordId}`,
      {
        method: `${Methods.DELETE}`,
        headers: {
          Authorization: `Bearer ${userWord}`,
          Accept: "application/json",
        },
      }
    ).then((response) => {
      return response.json();
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  // AggregatedWords

  async getUserStatistic({ userId, token }: IUserData) {
    const data = await fetch(`${Url.DOMEN}/users/${userId}/statistics`, {
      method: `${Methods.GET}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async putUserStatistic({ userId, token }: IUserData, statistic: IStatistic) {
    const data = await fetch(`${Url.DOMEN}/users/${userId}/statistics`, {
      method: `${Methods.PUT}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(statistic),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  // Settings

  async getUserSettings({ userId, token }: IUserData) {
    const data = await fetch(`${Url.DOMEN}/users/${userId}/statistics`, {
      method: `${Methods.GET}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async putUserSettings({ userId, token }: IUserData, statistic: ISettings) {
    const data = await fetch(`${Url.DOMEN}/users/${userId}/statistics`, {
      method: `${Methods.PUT}`,
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: JSON.stringify(statistic),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  // SignIn
  async signIn(user: IUser) {
    try {
      const res = await fetch(`${Url.DOMEN}/signin`, {
        method: Methods.POST,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (res.status === ResponseStatus.OK) {
        return res.json();
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  }
}

const httpClient = new HTTPClient();

export default httpClient;
