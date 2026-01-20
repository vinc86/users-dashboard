import users from "./users.json";

export const usersMockData = async (): Promise<Response> => {
  return await new Promise((resolve, reject) => {
    const random = Math.random();
    const error = random < 0.2;

    if (error) {
      return reject(new Error("Error fetching data"));
    }

    setTimeout(() => {
      return resolve(
        new Response(JSON.stringify(users), {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }),
      );
    }, 500);
  });
};
