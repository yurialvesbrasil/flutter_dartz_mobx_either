import 'package:dartz/dartz.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dartz_mobx_either/app/modules/login/exceptions/login_failure.dart';
import 'package:flutter_dartz_mobx_either/app/modules/login/repository/login_repository.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:mobx/mobx.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'login_store.g.dart';

class LoginStore = _LoginStoreBase with _$LoginStore;

abstract class _LoginStoreBase with Store {
  final LoginRepository _repository;
  TextEditingController loginContoller = TextEditingController();
  TextEditingController passwordController = TextEditingController();

  @observable
  Option<LoginFailure> failure = none();

  @observable
  bool loading = false;

  _LoginStoreBase(this._repository);

  @action
  Future<void> login() async {
    loading = true;
    failure = none();

    final loginResult = await _repository.login(
        login: loginContoller.text, password: passwordController.text);

    loginResult.fold((l) async {
      SharedPreferences sp = await SharedPreferences.getInstance();
      sp.remove('access_token');
      failure = optionOf(l);
      loading = false;
    }, (r) async {
      SharedPreferences sp = await SharedPreferences.getInstance();
      sp.setString('access_token', r);
      loading = false;
      Modular.to.pushNamedAndRemoveUntil('/', (_) => false);
    });
  }
}
