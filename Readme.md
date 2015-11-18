## How to setup?
Just extract the project files from the archive in a folder, on use git-clone to get a copy from the repository, then run `npm install` to install the dependencies, and then you can start the server using command `npm start`. You can also run the test suits with command `npm test` . You can find a web implementation demo in `./demo` folder. After starting the server on the local machine the API endpoint is accessible at `http://localhost/api` (handle POST request), and you can see the demo at `http://localhost/demo`.  

##What technologies used?
	- Node.js     |    Application Server
	- Express.js  |    Web development framework
	- Mocha.js    |    Test frameworks
	- Redis       |    In-memory data store
	- Others      |    Libraries(JSONStream, sax, request, jade, node-sass, expect.js,...)


##Stability
The offered solution designed by having stability, security, performance, and scalibility in mind.
> ### Validation of incoming request:
> * The only POST request to `/api` are served and other request are ignored.
> * The `Content-Type` header of requests must be `application/json` .
> * The post request body should be in JSON format contating `movie_resource_url` i.e `{"movie_resource_url": "http://content.viaplay.se/..."}`.
> * if all the conditions above have met the server checks to ensure if the requested url in `movie_resource_url` is a valid request.
> * A complete set of unit test were written covering all the codes and procedures in the solution, which bring a more stable solution, increase future development productivity, and it would male refactoring and debugging much easier. Specifically 5 behavourial tests, and 1 end to end system test.

##Performance
By taking benefits from asynchronous nature of node.js and in-memory data store provided by Redis, the resulting solution has a very high performance.
> ### Optimizations:
> * All the methods call and data flow in the solution are asynchronous by design mostly by using Promise and Stream objects.
> * Stream and data piping were used to parse and JSON and XML data, hence the solution are capable of handling large JSON and XML inputs.
> * All the successful requests are cached in Redis data store, and will be used in future request. It means we send minimum number of API calls to upstream servers.
> The response for subsequent requests are retrieved from Redis directly, and since Redis is an in-memory data-store, the response will be emitted even faster as if a static page were served.

##Scalability
In order to offer services to thousand and millions of the people, we need to ensure that our system is scale-able. Node.js always run in a single-thread, however because of its asynchronuos I/O, it is ten times faster than Apache, or IIS, when handling network and database and link data. However in real-life applications also performs computation that needs CPU cycle such as regular expressions and string manipulation. On the other hand, it has been a decade that almost all CPU structures has become multi-core. In order to utilize all of the computation power of the hosting machine we need to run multi-threaded Node.js. Hopefully, this is possible in node.js with node.js `cluster` package. In this solution, we managed to to design a multi-thread node.js, in which the starting process become *master* and fork itself to other processes and requests are done by the least busiest worker or in round robin fashion.

To increase the scalability of the node.js we should run a web-server such as nginx in front of node.js and reverse proxy the request through the webserver to the node.js application. We can also scale horizontally by having the same code running on different machines and use a load balancer to divide the traffic between those, furthermore we can use a message broker (Redis can be used as one) to synchronize the state between the machines and nodes.

![Running the test suits](http://i.imgur.com/piErxZd.png) ![Start our multi-threaded node.js application](http://i.imgur.com/yFRwYJP.png)

![A demonstration of the capability of the work](http://i.imgur.com/JXIwkGi.png)

 ----------
 
## Licence
 
>The MIT License

>Permission is hereby granted, free of charge, to any person obtaining a copy
>of this software and associated documentation files (the "Software"), to deal
>in the Software without restriction, including without limitation the rights
>to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
>copies of the Software, and to permit persons to whom the Software is
>furnished to do so, subject to the following conditions:
>
>The above copyright notice and this permission notice shall be included in
>all copies or substantial portions of the Software.
>
>THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
>IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
>FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
>AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
>LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
>OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
>THE SOFTWARE.
