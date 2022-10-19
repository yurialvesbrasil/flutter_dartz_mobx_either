import 'package:flutter/material.dart';
import 'package:flutter_mobx/flutter_mobx.dart';
import 'package:flutter_modular/flutter_modular.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'home_store.dart';

class HomePage extends StatefulWidget {
  final String title;
  const HomePage({Key? key, this.title = 'Home'}) : super(key: key);

  @override
  _HomePageState createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  final HomeStore homeStore = Modular.get<HomeStore>();

  @override
  void initState() {
    super.initState();

    SharedPreferences.getInstance().then((sp) {
      if (!sp.containsKey('access_token')) {
        Modular.to.pushNamedAndRemoveUntil('/login', (_) => false);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Counter'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout_sharp),
            tooltip: 'Logoff',
            onPressed: () async {
              await homeStore.logoff();
              Modular.to.pushNamedAndRemoveUntil('/login', (_) => false);
            },
          ),
        ],
      ),
      body: Observer(
        builder: (context) => Center(
            child: Text(
          '${homeStore.counter}',
          style: const TextStyle(fontSize: 28),
        )),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: () {
          homeStore.increment();
        },
        child: const Icon(Icons.add),
      ),
    );
  }
}
