riot.tag('register', '<div id="register-container"> <div class="register-content"> <div class="logo-container"> <div class="logo"></div> </div> <div id="error" class="{ errorState ? \'error-container show\' : \'error-container\' }"><p> { errorMessage }</p></div> <form id="register" onsubmit="{ submit }">  <input name="username" class="input" id="username" type="text" placeholder="Username (full domain)"> <input name="password" class="input" id="password" type="password" placeholder="Password"> <button name="submit" class="submit">Register</button> </form> <div class="unauthenticated-footer-links"> <div class="unauthenticated-footer-links-left"><a href="#">Login</a></div> <div class="unauthenticated-footer-links-right"><a href="#forgot-password">Forgot your password?</a></div> </div> </div> </div>', function(opts) {
        
        document.title = 'Scatter - Register';

        var self = this;

        this.submit = function(e) {
            e.preventDefault();

            var username: self.username.value.trim();
            var password: self.password.value.trim();

            console.log('[Register.js] Registering ', data);

            client = new XMPP.Client({
                websocket: { url: 'ws://dev.local:5280' },
                jid: username,
                password: password,
                register: true
            });

            client.addListener('online',
                function () {
                    console.log('Great Succes, you are now a member!');
                    self.unmount();
                    app.trigger('authenticated');
                }
            )

            client.addListener('error',
                function (e) {
                    self.errorState = true;
                    self.errorMessage = e.err.message || 'Unknown';
                    riot.update();
                }
            )

        }.bind(this);
    
});
