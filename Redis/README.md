# [__Redis__](https://redis.com/) 

![Redis logo](https://redis.com/wp-content/themes/wpx/assets/images/logo-redis.svg)

---

## 1 - What is Redis?

You may have used databases in your application - both relational and non-relational. Most of the databases you've used store data on the disk. Although it is persistent, it poses significant overhead when the data needs to be served frequently. For example, in an application that requires session-based authentication system, a database is needed to store session tokens. This use case is an example of __small__ data that is __read heavily__ - on every HTTP request from the user.

It's undeniable that memory access is always faster than disk access. Remote Dictionary Server (Redis) therefore is designed as an in-memory, key-value store that works like a database, but it's much faster due to the fact that data is retrieved in memory. At the same time, it provides two on-disk storage formats (RDB & AOF) so that the data can persist between redis sessions (Eg: during a crash or shutdown).

---

## 2 - Installing Redis on Windows

[> Best Video For this Topic](https://www.youtube.com/watch?v=_nFwPTHOMIY)

Redis is mainly designed for use in Linux. Prior to year 2016, there is a team from Microsoft actively maintaining the port for Redis to windows at their [Github](https://github.com/microsoftarchive/redis/releases/tag/win-3.0.504). However, it is no longer maintained. Instead, now we have the option to run native user-mode Linux shells and tools on Windows.

1. From Window's search bar, search and open __Turn windows features on or off__. 

1. Locate __Windows Subsystem for Linux__. Enable it and wait for it to install. You will be prompted for restart.

1. Go to windows store and search for __Ubuntu LTS__ (Or any Linux distribution you prefer). Install that (Just ensure you have a shell to proceed)

1.  Open the terminal. If it's the first time, you will have to key in a username and password. Then, run the following commands in order:

    ```bash
    sudo apt-add-repository ppa:redislabs/redis
    
    # Wait for download

    sudo apt-get update

    # Wait

    sudo apt-get upgrade

    # This takes a long time

    sudo apt-get install redis-server

    # Installation of redis server
    ```

    Verify the `redis-server` is installed properly via command `redis-server --version`.

1. Now we can directly issue `redis-server` to start the Redis server. We can use `redis-cli` to connect to the local redis server and issue commands. 

1. Additionally, if you want the server to run in the background, use `sudo service redis-server start` and `sudo service redis-server stop`. Restart is done by `sudo service redis-server restart`.

*Optionally, install [RedisInsight](https://redis.com/redis-enterprise/redis-insight/), the official GUI for Redis (Like workbench for SQL)*

---

## 3 - Redis Basics

This is not everything! Most of these commands are referenced.

[One good reference is from official tutorial](https://try.redis.io/)

<br/>

### 3.0 - Unimportants

Not important but ok

| Command | Description | Example |
| - | - | - |
| `PING` | Pong | `PING` <br/> *>> PONG* |
| `ECHO` | Echo | `ECHO Hello World` <br/> *>> Hello World* |
| `LOLWUT` | ??? | `LOLWUT` |

<br/>

### 3.1 - Basics

| Command | Description | Example |
| - | - | - |
| `SET` | Stores a new key value pair into the data store | `SET age 10`<br/>`SET server:port 8000`|
| `MSET` | Multiple set, set multiple key value pairs at one command | `MSET name1 John name2 Nick` |
| `GET` | Retrieves the value associated with the key from the data store | `GET age` <br/> `GET server:port` |
| `INCR` | Increments the value associated with the key | `INCR age` <br/> *>> 11* |
| `DECR` | Decrements the value associated with the key | `DECR age` <br/> *>> 10* |
| `INCRBY` | Increments the value associated with the key by N | `INCRBY age 5` <br/> *>> 15* |
| `DECRBY` | Decrements the value associated with the key by N | `INCRBY age 5` <br/> *>> 10* |
| `EXISTS` | Check if the key exists in the data store | `EXISTS age` <br/> *>> 1* |
| `DEL` | Deletes the key-value pair from data store | `DEL server:port` |
| `FLUSHALL` | Clears everything from data store (`DROP TABLE` vibe?) | `FLUSHALL` |
| `RENAME` | Renames the key to a new key name | `RENAME name2 name3` |
| `EXPIRE` | Set an expiry countdown in seconds on an entry. Once expired, the entry will be deleted automatically. | `EXPIRE age 5000` |
| `TTL` | Stands for Time To Live. Returns number of seconds until expiry. -1 means infinite. -2 means expired/non-existent | `TTL name1` <br/> *>> -2* <br/> `TTL age` <br/> *>> 4950* |
| `SETEX` | `SET` and `EXPIRE` combined in one command. | `SETEX diein10 10 myValue` |
| `PERSIST` | Removes expire countdown from an entry | `PERSIST diein10` |

Note: `INCR` and `DECR` are preferred because they are atomic operations, instead of `GET` first, increment, then `SET` - 3 operations.

<br/>

### 3.2 - List

| Command | Description | Example |
| - | - | - |
| `RPUSH` | Push new element to right of list | `RPUSH alpha C D E F` |
| `LPUSH` | Push new element to left of list | `LPUSH alpha B A` |
| `LRANGE` | Retrieves sublist. -1 means last element (You know your Python) | `LRANGE alpha 0 -3` <br/> *>> A B C D* |
| `LPOP` | Pop and returns the element from the left | `LPOP alpha` <br/> *>> A* |
| `RPOP` | Pop and returns the element from the right | `RPOP alpha` <br/> *>> F* |
| `LLEN` | Length | `LLEN alpha` <br/> *>> 4* |
| `LINSERT` | Inserts element in the list stored at key either before or after the reference value `pivot`. | `LINSERT alpha BEFORE "A" Z` |

<br/>

### 3.3 - Set

| Command | Description | Example |
| - | - | - |
| `SADD` | Adds new element to set | `SADD primes 2 3 5 7 11` |
| `SREM` | Removes an element from set | `SREM primes 2` |
| `SISMEMBER` | Is member? | `SISMEMBER primes 3` <br/> *>> 1* |
| `SMEMBERS` | List all members of set | `SMEMBERS primes` <br/> *>> 3 5 7 11* |
| `SCARD` | Cardinality, aka Length/Size | `SCARD primes` <br/> *>> 4* |
| `SPOP` | Pop element from set no specific order | `SPOP primes` |


<br/>

### 3.4 - Hashes

| Command | Description | Example |
| - | - | - |
| `HSET` | Sets a new field in the hash with associated key | `HSET server:sessions 1 John 2 Alex 3 Nick` |
| `HGET` | Retrieves the value with given field from the hash associated with the key | `HGET server:sessions 3` <br/> *>> Nick* |
| `HGETALL` | List all entries in the hash | `HGETALL server:sessions` <br/> *>> 1 John 2 Alex 3 Nick* |
| `HDEL` | Deletes the field in the hash | `HDEL server:sessions 3` |

---

## 4 - Data Persistance

[Reference](https://redis.io/topics/persistence)

Redis provides 2 main method for data persistance:

* __RDB__ (Redis Database) - Performs point-in-time snapshots of your data store at specified intervals

* __AOF__ (Append only file) - The AOF persistence logs every write operation received by the server, that will be played again at server startup, reconstructing the original dataset.

RDB is as simple as a `SAVE` command, which immediately saves the data store to the disk. You can specify the interval at which data is saved to the disk as well as the number of key changes required to initiate a key change, like `SAVE 60 1000` - Saves every 60 seconds, if at least 1000 keys changed.

AOF has to be activated by going into the configuration file and set the `appendonly` configuration to `yes`. After that every time the server restarts, it will re-play the AOF to rebuild the state.


---

## 5 - Side Notes:

1. This Readme only serves as my little note for Redis. It does not cover a lot of things, like Sorted Set etc. Please refer to the official documentation.

1. Expiration only works on top-level key. You might thought of a hash which stores session keys that expires. Instead of using hash, use prefix naming like `sessions:129571`. The idea is to use prefixes to group keys.
