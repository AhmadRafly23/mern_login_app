import axios from 'axios';
import jwt_decode from 'jwt-decode';

axios.defaults.baseURL = 'http://localhost:8080';

/**Get Username from Local Storage*/
export async function getUsername() {
  const token = localStorage.getItem('token');
  if (!token) return Promise.reject('Cannot find token');
  let decode = jwt_decode(token);

  return decode;
}

/**Authenticate Function*/
export async function authenticate(username) {
  try {
    return await axios.post('/api/authenticate', { username });
  } catch (error) {
    return { error: "Username doesn't exist" };
  }
}

/**Get User Details*/
export async function getUser(username) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password doesn't match" };
  }
}

/**Register User*/
export async function registerUser(credentials) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post('/api/register', credentials);

    const { username, email } = credentials;

    /**Send Email*/
    if (status === 201) {
      await axios.post('/api/registerEmail', {
        username,
        userEmail: email,
        text: msg,
      });

      return Promise.resolve(msg);
    }
  } catch (error) {
    return Promise.reject({ error });
  }
}

/**Login User*/
export async function loginUser({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post('/api/login', { username, password });
      return Promise.resolve({ data });
    }
  } catch (error) {
    return Promise.reject({ error: "Password doesn't match" });
  }
}

/**Update User Profile*/
export async function updateUserProfile(response) {
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.put('/api/updateUser', response, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return Promise.resolve({ data });
  } catch (error) {
    Promise.reject({ error: "Couldn't update profile" });
  }
}

/**Generate OTP*/
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get(`/api/generateOTP?username=${username}`);

    /**Send Mail With the OTP*/
    if (status === 201) {
      const {
        data: { email },
      } = await getUser(username);

      const text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
      await axios.post('/api/registerEmail', {
        username,
        userEmail: email,
        text,
        subject: 'Password Recovery OTP',
      });
    }
    return Promise.resolve(code);
  } catch (error) {
    return Promise.reject({ error });
  }
}

/**Verify OTP*/
export async function verifyOTP(username, code) {
  try {
    const { data, status } = await axios.get(
      `/api/verifyOTP?username=${username}&code=${code}`
    );
    return { data, status };
  } catch (error) {
    return error;
  }
}

/**Reset Password*/
export async function resetPassword(username, password) {
  try {
    const { data, status } = await axios.put('/api/resetPassword', {
      username,
      password,
    });
    return Promise.resolve({ data, status });
  } catch (error) {
    return Promise.reject({ error });
  }
}
