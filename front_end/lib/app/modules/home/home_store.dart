import 'package:mobx/mobx.dart';
import 'package:shared_preferences/shared_preferences.dart';

part 'home_store.g.dart';

class HomeStore = HomeStoreBase with _$HomeStore;

abstract class HomeStoreBase with Store {
  @observable
  int counter = 0;

  Future<void> increment() async {
    counter = counter + 1;
  }

  @action
  Future<void> logoff() async {
    SharedPreferences sp = await SharedPreferences.getInstance();
    sp.remove('access_token');
  }
}
