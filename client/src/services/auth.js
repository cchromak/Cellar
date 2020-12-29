const auth = {
    isAuthenticated: false,
    user: null,
    authenticate(email, password) {
      return fetch('/api/auth/login', { 
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          if(!response.ok) {
            throw new Error('Login Failed');
          }
  
          return response.json();
        })
        .then((body) => {
          this.isAuthenticated = true;
          this.user = body.userEmail;
          return body;
        });
    },
    signout(cb) {
      return fetch('/api/auth/logout', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => {
          if(!response.ok) {
            throw new Error('Logout Failed');
          }
  
          return response.json();
        })
        .then((body) => {
          //this.isAuthenticated = false;
          return body;
        });
    },
    signin(profileImage,username,email,password){
      const formData = new FormData();
      formData.append("image", profileImage);
      formData.append("json",JSON.stringify({ username, email, password }));
      return fetch('/api/auth/signup',{
        method:'POST',
        body: formData,
        headers:{
         // 'Content-Type': 'application/json',
        }
      }).then((response)=>{
        if (!response.ok){
          throw new Error('Signup Failed');
        }
        return response.json();
      }).then((body) => {
        this.isAuthenticated = true;
        this.user = body.userEmail;
        return body;
      });
    },
    
  }
  
  export default auth; 