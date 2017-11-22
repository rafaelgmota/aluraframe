class Bind {
    constructor(model, view, props) {

       let proxy = ProxyFactory.create(model, props, param =>
            view.update(param));

       view.update(model);
       return proxy;
    }
}