import 'package:dartz/dartz.dart';
import 'package:dio/dio.dart';

import '../exceptions/login_failure.dart';

abstract class LoginRepository {
  Future<Either<LoginFailure, String>> login(
      {required String login, required String password});
}

class LoginRepositoryImpl extends LoginRepository {
  @override
  Future<Either<LoginFailure, String>> login(
      {required String login, required String password}) async {
    try {
      final response = await Dio().post('http://localhost:3000/login',
          data: {'login': login, 'password': password});
      return right('token');
    } on DioError catch (e) {
      if (e.response?.statusCode == 403) {
        return left(LoginNotFoundFailure());
      }
      return left(LoginServerErrorFailure(e.message));
    } catch (e) {
      return left(LoginServerErrorFailure(e.toString()));
    }
  }
}
