# **Tests unitaires Sprint 2**

* HeaderHome
* Menu (leftDrawer)
* Account (rightDrawer)
* SignIn
* SignUp



--------------------------------------------------------------------------------------------------------------------------
#
## Tests HeaderHome Visual
### HeaderHome Component
    => TU1: HeaderHome should exist and be visible
        - expect headerHome to exist
        - expect headerHome to be visible

### Menu (leftDrawer)
    => TU2: HeaderHome should have a visible menu button
        - expect menu button to exist
        - expect menu button to be visible

### Logo
    => TU3: HeaderHome should have a visible logo
        - expect logo to exist
        - expect logo to be visible

### Searchbar
    => TU4: HeaderHome should have a visible search bar input
        - expect search bar to exist
        - expect search bar to be visible
        - expect search bar to be a text input
        - expect search bar placeholder to be correct

### Account (rightDrawer)
    => TU5: HeaderHome should have a visible account button
        - expect account button to exist
        - expect account button to be visible

## Menu (leftDrawer)
### DrawerLeft Component
    => TU1: LeftDrawer should exist and be visible
        - expect leftDrawer to exist
        - expect leftDrawer to be visible

### Menu
    => TU2: LeftDrawer should open the correct menu
        - First word of the menu should exists and be visible
        - First word of the menu should be correct

## Account (rightDrawer)
### DrawerRight Component
    => TU1: RightDrawer should exist and be visible
        - expect rightDrawer to exist
        - expect rightDrawer to be visible

    => TU2: RightDrawer should open the correct menu
        - expect rightDrawer to have a sign in button
        - expect rightDrawer sign in button to be visible
        - expect rightDrawer to have a sign up button
        - expect rightDrawer sign up button to be visible

### Sign in button
#### Signin Component
    => TU1: SignIn should exist and be visible
        - expect signin to exist
        - expect signin to be visible

    => TU2: SignIn should have a form
        - expect signin form to exist
        - expect signin form to be visible

    => TU3: SignIn should have the correct form elements
        - expect signInForm to have an email input
        - expect signInForm email input to be visible
        - expect email type to be email 
        - expect signInForm to have a password input
        - expect signInForm password input to be visible
        - expect password type to be password
        - expect signInForm to have a login button
        - expect signInForm login button to be visible

    => TU4: SignIn should have the correct error message on submitting form with error
        - expect signInForm to have an error message
        - expect signInForm error message to be visible
        - expect signInForm error message to be correct




### Sign up button
#### Signup Component
    => TU1: SignUp should exist and be visible
        - expect signup to exist
        - expect signup to be visible

    => TU2: SignUp should have a form
        - expect signup form to exist
        - expect signup form to be visible

    => TU3: SignUp should have the correct form elements
        - expect signUpForm to have a username input
        - expect signUpForm username input to be visible
        - expect username type to be text

        - expect signUpForm to have an email input
        - expect signUpForm email input to be visible
        - expect email type to be email 

        - expect signUpForm to have a password input
        - expect signUpForm password input to be visible
        - expect password type to be password

        - expect signUpForm to have a password confirmation input
        - expect signUpForm password confirmation input to be visible
        - expect password confirmation type to be password

        - expect signUpForm to have a createAccount button
        - expect signUpForm createAccount button to be visible

    => TU4: SignUp should have the correct error message on submitting form with error
        - expect signUpForm to have an error message
        - expect signUpForm error message to be visible
        - expect signUpForm error message to be correct
--------------------------------------------------------------------------------------------------------------------------