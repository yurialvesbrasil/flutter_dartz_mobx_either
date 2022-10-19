import 'package:flutter_dartz_mobx_either/app/modules/login/exceptions/login_failure.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:flutter_dartz_mobx_either/app/modules/login/login_store.dart';
import 'package:flutter/material.dart';
import 'package:mobx/mobx.dart';
import 'package:rflutter_alert/rflutter_alert.dart';

class LoginPage extends StatefulWidget {
  final String title;
  const LoginPage({Key? key, this.title = 'LoginPage'}) : super(key: key);
  @override
  _LoginPageState createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  final LoginStore store = Modular.get<LoginStore>();
  bool isAlertOpen = false;

  @override
  void initState() {
    super.initState();
    reaction((_) => store.failure, (_) {
      String? message;
      store.failure.fold(() => message = 'Erro desconhecido', (failure) {
        if (failure is LoginNotFoundFailure) {
          message = 'Login ou senha inválidos';
        } else {
          message = 'Erro ao realizar login';
        }

        //Lança alerta de erro
        if (!isAlertOpen) {
          setState(() {
            isAlertOpen = true;
          });
          Alert(
            context: context,
            title: "ERROR",
            desc: message,
            image: const Icon(Icons.error_rounded),
            buttons: [
              DialogButton(
                // ignore: sort_child_properties_last
                child: const Text(
                  'Close',
                  style: TextStyle(color: Colors.white, fontSize: 20),
                ),
                onPressed: () {
                  Navigator.pop(context);
                  setState(() {
                    isAlertOpen = false;
                  });
                },
                width: 120,
              )
            ],
          ).show();
        }
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    final ButtonStyle styleButton =
        ElevatedButton.styleFrom(textStyle: const TextStyle(fontSize: 12));

    return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: Padding(
          padding: const EdgeInsets.all(10),
          child: Column(children: [
            TextFormField(
              controller: store.loginContoller,
              decoration: const InputDecoration(labelText: 'Login'),
            ),
            const SizedBox(
              height: 8,
            ),
            TextFormField(
              controller: store.passwordController,
              decoration: const InputDecoration(labelText: 'Password'),
            ),
            const SizedBox(
              height: 12,
            ),
            ElevatedButton(
              style: styleButton,
              onPressed: () => store.login(),
              child: const Text('Login'),
            ),
          ]),
        ));
  }
}
