### CAP Theorem

It is impossible for a distributed data store to simultaneously provide more than 2 out of the following 3 guarantees

- Consistency: Every read receives the most recent write or an error
- Availability: Every request receives a (non-error) response, without the guarantee that it contains the most recent write
- Partition tolerance: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes

When a network partition failure happens should we decide to

- Cancel the operation and thus decrease the availability but ensure consistency
- Proceed with the operation and thus provide availability but risk inconsistency

The CAP theorem implies that in the presence of a network partition, one has to choose between consistency and availability.

tags: CAP theorem

---

### logging SSH access attempts

https://unix.stackexchange.com/questions/127432/logging-ssh-access-attempts

/var/log/auth.log

```bash
sudo grep -i 'fail' /var/log/auth.log
```

tags: ssh, security

---

### self-signed SSL certificate

```bash
openssl req -batch -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/ssl/private/nginx.key -out /etc/ssl/certs/nginx.crt -batch
```

---

### SSL with Let's Encrypt

https://www.youtube.com/watch?v=oykl1Ih9pMg

https://certbot.eff.org/lets-encrypt/ubuntufocal-nginx

tags: ssl, security, nginx, Let's Encrypt

---

### simple web server

```bash
busybox httpd -f -h . -p 0.0.0.0:8080 -v

# -f: don't daemonize
# -h: home directory (default .)
# -p: bind to IP:PORT (default *:80)
# -v: verbose
```

tags: busybox, web server, dev tool

---

### change playback rate

```js
// developer mode -> console

// netflix
document.querySelector('video').playbackRate = 2;

// prime video
document.querySelectorAll('video')[1].playbackRate = 1.5;
```
