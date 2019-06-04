<template>
    <form @submit.prevent id="login">
        <div class="input-field inline">
            <input v-model="fields.email" id="email_inline" type="text" placeholder="bob@yahoo.com">
            <input v-model="fields.password" id="email_inline" type="text" placeholder="Password">

            <button type="submit" form="signup" class="waves-effect waves-light btn-small difficultyButtons" @click="login()">submit</button>
        </div>
    </form>
</template>

<script>
export default {
  name: "Login",
  data(){
    return {
      fields: {
        email: "",
        password: ""
      }
    };
  },
    methods: {
        login() {
            if (this.fields.email !== "" && this.fields.password !== "") {
                var data = {"email":`${this.fields.email}`,"password":`${this.fields.password}`}

                fetch("http://localhost:4000/api/users/sign_in", {
                    method: 'POST',
                    body: JSON.stringify(data), // data can be `string` or {object}!
                    headers:{
                    'Content-Type': 'application/json'
                    }
                }).then(res => res.json())
                .then(response => console.log('Success:', JSON.stringify(response)))
                .catch(error => console.error('Error:', error));
            } else {
                alert("email and/or password cannot be blank!")
            }
        }
    }
}
</script>

<style scoped>

</style>