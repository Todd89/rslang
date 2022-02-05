import {
  Statistic,
  Settings,
  User,
  UserData,
  UserWord,
} from "../interface/interface";

class HTTPClient {
  // Words

  async getWords() {
    const data = await fetch("https://react-app-learnwords.herokuapp.com/words")
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async getChunkOfWords(pageNum: string, groupNum: string) {
    const data = await fetch(`https://react-app-learnwords.herokuapp.com/words/?page=${pageNum}&group=${groupNum}`)
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async getWord(id: string) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/words/${id}`
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  //Users

  async createUser(user: User) {
    const data = await fetch(
      "https://react-app-learnwords.herokuapp.com/users",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async getUser({ userId, token }: UserData) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/users/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async deleteUser({ userId, token }: UserData) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/users/${userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "content-type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async getNewUserToken({ userId, token }: UserData) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/users/${userId}/tokens`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  // User Words

  async getAllUserWords({ userId, token }: UserData) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/users/${userId}/words`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.log(console.log(error));
      });
    return data;
  }

  async createUserWord({ userId, wordId, word, token }: UserWord) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/users/${userId}/words/${wordId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(word),
      }
    ).then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(console.log(error));
    });
  return data;
  }

  async getUserWord({ userId, wordId, token }: UserWord) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/users/${userId}/words/${wordId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    ).then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(console.log(error));
    });
  return data;
  }

  async updateUserWord({ userId, wordId, token, word }: UserWord) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/users/${userId}/words/${wordId}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(word),
      }
    ).then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(console.log(error));
    });
  return data;
  }

  async deleteUserWord({ userId, wordId, token }: UserWord) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/users/${userId}/words/${wordId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    ).then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(console.log(error));
    });
  return data;
  }

  // AggregatedWords

  async getUserStatistic({ userId, token }: UserData) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/users/${userId}/statistics`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    ).then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(console.log(error));
    });
  return data;
  }

  async putUserStatistic({ userId, token }: UserData, statistic: Statistic) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/users/${userId}/statistics`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(statistic),
      }
    ).then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(console.log(error));
    });
  return data;
  }

  // Settings

  async getUserSettings({ userId, token }: UserData) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/users/${userId}/statistics`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      }
    ).then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(console.log(error));
    });
  return data;
  }

  async putUserSettings({ userId, token }: UserData, statistic: Settings) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/users/${userId}/statistics`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: JSON.stringify(statistic),
      }
    ).then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(console.log(error));
    });
  return data;
  }

  // SignIn

  async signIn(user: User) {
    const data = await fetch(
      `https://react-app-learnwords.herokuapp.com/signin`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(user),
      }
    ).then((response) => {
      return response.json();
    })
    .catch((error) => {
      console.log(console.log(error));
    });
  return data;
  }
}

const httpClient = new HTTPClient();

export default httpClient;
