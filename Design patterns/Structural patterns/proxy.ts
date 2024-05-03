/**
 * https://refactoring.guru/design-patterns/proxy
 * 
 * Proxy is a structural design pattern that lets you provide a substitute or
 * placeholder for another object. A proxy controls access to the original object, 
 * allowing you to perform something either before or after the request gets 
 * through to the original object.
 * 
 */


/**
 * The Subject interface declares common operations for both RealSubject and the
 * Proxy. As long as the client works with RealSubject using this interface,
 * you'll be able to pass it a proxy instead of a real subject.
 */
interface Subject {
    request(): void;
}

/**
 * The RealSubject contains some core business logic. Usually, RealSubjects are
 * capable of doing some useful work which may also be very slow or sensitive -
 * e.g. correcting input data. A Proxy can solve these issues without any
 * changes to the RealSubject's code.
 */
class RealSubject implements Subject {
    public request(): void {
        console.log('RealSubject: Handling request.');
    }
}

/**
 * The Proxy has an interface identical to the RealSubject.
 */
class Proxy implements Subject {
    private realSubject: RealSubject;

    /**
     * The Proxy maintains a reference to an object of the RealSubject class. It
     * can be either lazy-loaded or passed to the Proxy by the client.
     */
    constructor(realSubject: RealSubject) {
        this.realSubject = realSubject;
    }

    /**
     * The most common applications of the Proxy pattern are lazy loading,
     * caching, controlling the access, logging, etc. A Proxy can perform one of
     * these things and then, depending on the result, pass the execution to the
     * same method in a linked RealSubject object.
     */
    public request(): void {
        if (this.checkAccess()) {
            this.realSubject.request();
            this.logAccess();
        }
    }

    private checkAccess(): boolean {
        // Some real checks should go here.
        console.log('Proxy: Checking access prior to firing a real request.');

        return true;
    }

    private logAccess(): void {
        console.log('Proxy: Logging the time of request.');
    }
}

/**
 * The client code is supposed to work with all objects (both subjects and
 * proxies) via the Subject interface in order to support both real subjects and
 * proxies. In real life, however, clients mostly work with their real subjects
 * directly. In this case, to implement the pattern more easily, you can extend
 * your proxy from the real subject's class.
 */
function clientCode(subject: Subject) {
    // ...

    subject.request();

    // ...
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new RealSubject();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new Proxy(realSubject);
clientCode(proxy);

/**
 * Client: Executing the client code with a real subject:
RealSubject: Handling request.

Client: Executing the same client code with a proxy:
Proxy: Checking access prior to firing a real request.
RealSubject: Handling request.
Proxy: Logging the time of request.
 */


/**
 * Decorator and Proxy have similar structures, but very different intents. 
 * Both patterns are built on the composition principle, where one object 
 * is supposed to delegate some of the work to another. The difference is that
 *  a Proxy usually manages the life cycle of its service object on its own, 
 * whereas the composition of Decorators is always controlled by the client.
 * 
 *  Applicability
There are dozens of ways to utilize the Proxy pattern. Let’s go over the most popular uses.

 Lazy initialization (virtual proxy). This is when you have a heavyweight service object that 
 wastes system resources by being always up, even though you only need it from time to time.

 Instead of creating the object when the app launches, you can delay the object’s initialization 
 to a time when it’s really needed.

 Access control (protection proxy). This is when you want only specific clients to be able to 
 use the service object; for instance, when your objects are crucial parts of an operating system 
 and clients are various launched applications (including malicious ones).

 The proxy can pass the request to the service object only if the client’s credentials match some criteria.

 Local execution of a remote service (remote proxy). This is when the service object is located on a remote server.

 In this case, the proxy passes the client request over the network, handling all of the nasty details 
 of working with the network.

 Logging requests (logging proxy). This is when you want to keep a history of requests to the service object.

 The proxy can log each request before passing it to the service.

 Caching request results (caching proxy). This is when you need to cache results of client requests 
 and manage the life cycle of this cache, especially if results are quite large.

 The proxy can implement caching for recurring requests that always yield the same results. 
 The proxy may use the parameters of requests as the cache keys.

 Smart reference. This is when you need to be able to dismiss a heavyweight object once there 
 are no clients that use it.

 The proxy can keep track of clients that obtained a reference to the service object or its results. 
 From time to time, the proxy may go over the clients and check whether they are still active. 
 If the client list gets empty, the proxy might dismiss the service object and free the underlying system resources.

The proxy can also track whether the client had modified the service object. Then the unchanged objects 
may be reused by other clients.
 */
