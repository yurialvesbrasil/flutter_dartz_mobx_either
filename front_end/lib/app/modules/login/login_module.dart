import 'package:flutter_dartz_mobx_either/app/modules/login/login_page.dart';
import 'package:flutter_dartz_mobx_either/app/modules/login/login_store.dart';
import 'package:flutter_dartz_mobx_either/app/modules/login/repository/login_repository.dart';
import 'package:flutter_modular/flutter_modular.dart';

class LoginModule extends Module {
  @override
  final List<Bind> binds = [
    Bind.singleton((i) => LoginRepositoryImpl()),
    Bind.singleton((i) => LoginStore(i())),
  ];

  @override
  final List<ModularRoute> routes = [
    ChildRoute('/', child: (_, args) => const LoginPage()),
  ];
}
