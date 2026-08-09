var at = Object.defineProperty;
var ot = (i, t, e) => t in i ? at(i, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : i[t] = e;
var _ = (i, t, e) => ot(i, typeof t != "symbol" ? t + "" : t, e);
var r;
(function(i) {
  i[i.SUCCESS = 0] = "SUCCESS", i[i.E2BIG = 1] = "E2BIG", i[i.EACCESS = 2] = "EACCESS", i[i.EADDRINUSE = 3] = "EADDRINUSE", i[i.EADDRNOTAVAIL = 4] = "EADDRNOTAVAIL", i[i.EAFNOSUPPORT = 5] = "EAFNOSUPPORT", i[i.EAGAIN = 6] = "EAGAIN", i[i.EALREADY = 7] = "EALREADY", i[i.EBADF = 8] = "EBADF", i[i.EBADMSG = 9] = "EBADMSG", i[i.EBUSY = 10] = "EBUSY", i[i.ECANCELED = 11] = "ECANCELED", i[i.ECHILD = 12] = "ECHILD", i[i.ECONNABORTED = 13] = "ECONNABORTED", i[i.ECONNREFUSED = 14] = "ECONNREFUSED", i[i.ECONNRESET = 15] = "ECONNRESET", i[i.EDEADLK = 16] = "EDEADLK", i[i.EDESTADDRREQ = 17] = "EDESTADDRREQ", i[i.EDOM = 18] = "EDOM", i[i.EDQUOT = 19] = "EDQUOT", i[i.EEXIST = 20] = "EEXIST", i[i.EFAULT = 21] = "EFAULT", i[i.EFBIG = 22] = "EFBIG", i[i.EHOSTUNREACH = 23] = "EHOSTUNREACH", i[i.EIDRM = 24] = "EIDRM", i[i.EILSEQ = 25] = "EILSEQ", i[i.EINPROGRESS = 26] = "EINPROGRESS", i[i.EINTR = 27] = "EINTR", i[i.EINVAL = 28] = "EINVAL", i[i.EIO = 29] = "EIO", i[i.EISCONN = 30] = "EISCONN", i[i.EISDIR = 31] = "EISDIR", i[i.ELOOP = 32] = "ELOOP", i[i.EMFILE = 33] = "EMFILE", i[i.EMLINK = 34] = "EMLINK", i[i.EMSGSIZE = 35] = "EMSGSIZE", i[i.EMULTIHOP = 36] = "EMULTIHOP", i[i.ENAMETOOLONG = 37] = "ENAMETOOLONG", i[i.ENETDOWN = 38] = "ENETDOWN", i[i.ENETRESET = 39] = "ENETRESET", i[i.ENETUNREACH = 40] = "ENETUNREACH", i[i.ENFILE = 41] = "ENFILE", i[i.ENOBUFS = 42] = "ENOBUFS", i[i.ENODEV = 43] = "ENODEV", i[i.ENOENT = 44] = "ENOENT", i[i.ENOEXEC = 45] = "ENOEXEC", i[i.ENOLCK = 46] = "ENOLCK", i[i.ENOLINK = 47] = "ENOLINK", i[i.ENOMEM = 48] = "ENOMEM", i[i.ENOMSG = 49] = "ENOMSG", i[i.ENOPROTOOPT = 50] = "ENOPROTOOPT", i[i.ENOSPC = 51] = "ENOSPC", i[i.ENOSYS = 52] = "ENOSYS", i[i.ENOTCONN = 53] = "ENOTCONN", i[i.ENOTDIR = 54] = "ENOTDIR", i[i.ENOTEMPTY = 55] = "ENOTEMPTY", i[i.ENOTRECOVERABLE = 56] = "ENOTRECOVERABLE", i[i.ENOTSOCK = 57] = "ENOTSOCK", i[i.ENOTSUP = 58] = "ENOTSUP", i[i.ENOTTY = 59] = "ENOTTY", i[i.ENXIO = 60] = "ENXIO", i[i.EOVERFLOW = 61] = "EOVERFLOW", i[i.EOWNERDEAD = 62] = "EOWNERDEAD", i[i.EPERM = 63] = "EPERM", i[i.EPIPE = 64] = "EPIPE", i[i.EPROTO = 65] = "EPROTO", i[i.EPROTONOSUPPORT = 66] = "EPROTONOSUPPORT", i[i.EPROTOTYPE = 67] = "EPROTOTYPE", i[i.ERANGE = 68] = "ERANGE", i[i.EROFS = 69] = "EROFS", i[i.ESPIPE = 70] = "ESPIPE", i[i.ESRCH = 71] = "ESRCH", i[i.ESTALE = 72] = "ESTALE", i[i.ETIMEDOUT = 73] = "ETIMEDOUT", i[i.ETXTBSY = 74] = "ETXTBSY", i[i.EXDEV = 75] = "EXDEV", i[i.ENOTCAPABLE = 76] = "ENOTCAPABLE";
})(r || (r = {}));
var I;
(function(i) {
  i[i.REALTIME = 0] = "REALTIME", i[i.MONOTONIC = 1] = "MONOTONIC", i[i.PROCESS_CPUTIME_ID = 2] = "PROCESS_CPUTIME_ID", i[i.THREAD_CPUTIME_ID = 3] = "THREAD_CPUTIME_ID";
})(I || (I = {}));
var m;
(function(i) {
  i[i.SET = 0] = "SET", i[i.CUR = 1] = "CUR", i[i.END = 2] = "END";
})(m || (m = {}));
var C;
(function(i) {
  i[i.UNKNOWN = 0] = "UNKNOWN", i[i.BLOCK_DEVICE = 1] = "BLOCK_DEVICE", i[i.CHARACTER_DEVICE = 2] = "CHARACTER_DEVICE", i[i.DIRECTORY = 3] = "DIRECTORY", i[i.REGULAR_FILE = 4] = "REGULAR_FILE", i[i.SOCKET_DGRAM = 5] = "SOCKET_DGRAM", i[i.SOCKET_STREAM = 6] = "SOCKET_STREAM", i[i.SYMBOLIC_LINK = 7] = "SYMBOLIC_LINK";
})(C || (C = {}));
var P;
(function(i) {
  i[i.DIR = 0] = "DIR";
})(P || (P = {}));
var l;
(function(i) {
  i[i.CLOCK = 0] = "CLOCK", i[i.FD_READ = 1] = "FD_READ", i[i.FD_WRITE = 2] = "FD_WRITE";
})(l || (l = {}));
const ft = {
  SYMLINK_FOLLOW: 1
  // As long as the resolved path corresponds to a symbolic
  // link, it is expanded.
}, O = {
  CREAT: 1,
  // Create file if it does not exist.
  DIRECTORY: 2,
  // Fail if not a directory.
  EXCL: 4,
  // Fail if file already exists.
  TRUNC: 8
  // Truncate file to size 0.
}, A = {
  APPEND: 1,
  // Append mode: Data written to the file is always appended to the file's end.
  DSYNC: 2,
  // Write according to synchronized I/O data integrity completion. Only the data stored in the file is synchronized.
  NONBLOCK: 4,
  // Non-blocking mode.
  RSYNC: 8,
  // Synchronized read I/O operations.
  SYNC: 16
  // Write according to synchronized I/O file integrity completion. In addition to synchronizing the data stored in the file, the implementation may also synchronously update the file's metadata.
}, d = {
  FD_DATASYNC: BigInt(1) << BigInt(0),
  FD_READ: BigInt(1) << BigInt(1),
  FD_SEEK: BigInt(1) << BigInt(2),
  FD_FDSTAT_SET_FLAGS: BigInt(1) << BigInt(3),
  FD_SYNC: BigInt(1) << BigInt(4),
  FD_TELL: BigInt(1) << BigInt(5),
  FD_WRITE: BigInt(1) << BigInt(6),
  FD_ADVISE: BigInt(1) << BigInt(7),
  FD_ALLOCATE: BigInt(1) << BigInt(8),
  PATH_CREATE_DIRECTORY: BigInt(1) << BigInt(9),
  PATH_CREATE_FILE: BigInt(1) << BigInt(10),
  PATH_LINK_SOURCE: BigInt(1) << BigInt(11),
  PATH_LINK_TARGET: BigInt(1) << BigInt(12),
  PATH_OPEN: BigInt(1) << BigInt(13),
  FD_READDIR: BigInt(1) << BigInt(14),
  PATH_READLINK: BigInt(1) << BigInt(15),
  PATH_RENAME_SOURCE: BigInt(1) << BigInt(16),
  PATH_RENAME_TARGET: BigInt(1) << BigInt(17),
  PATH_FILESTAT_GET: BigInt(1) << BigInt(18),
  PATH_FILESTAT_SET_SIZE: BigInt(1) << BigInt(19),
  PATH_FILESTAT_SET_TIMES: BigInt(1) << BigInt(20),
  FD_FILESTAT_GET: BigInt(1) << BigInt(21),
  FD_FILESTAT_SET_SIZE: BigInt(1) << BigInt(22),
  FD_FILESTAT_SET_TIMES: BigInt(1) << BigInt(23),
  PATH_SYMLINK: BigInt(1) << BigInt(24),
  PATH_REMOVE_DIRECTORY: BigInt(1) << BigInt(25),
  PATH_UNLINK_FILE: BigInt(1) << BigInt(26),
  POLL_FD_READWRITE: BigInt(1) << BigInt(27),
  SOCK_SHUTDOWN: BigInt(1) << BigInt(28),
  SOCK_ACCEPT: BigInt(1) << BigInt(29)
}, D = {
  ATIM: 1,
  // Adjust the last data access timestamp to the value stored in filestat::atim.
  ATIM_NOW: 2,
  // Adjust the last data access timestamp to the time of clock clockid::realtime.
  MTIM: 4,
  // Adjust the last data modification timestamp to the value stored in filestat::mtim.
  MTIM_NOW: 8
  // Adjust the last data modification timestamp to the time of clock clockid::realtime.
}, et = {
  SUBSCRIPTION_CLOCK_ABSTIME: 1
  // If set, treat the timestamp provided in subscription_clock::timeout as an absolute timestamp of clock subscription_clock::id. If clear, treat the timestamp provided in subscription_clock::timeout relative to the current time value of clock subscription_clock::id.
}, ht = {
  FD_READWRITE_HANGUP: 1
  // The peer of this socket has closed or disconnected.
}, G = 64, H = 48, V = 32, It = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get Clock() {
    return I;
  },
  EVENT_SIZE: V,
  EventReadWriteFlags: ht,
  get EventType() {
    return l;
  },
  FILESTAT_SIZE: G,
  FileDescriptorFlags: A,
  FileStatTimestampFlags: D,
  get FileType() {
    return C;
  },
  LookupFlags: ft,
  OpenFlags: O,
  get PreopenType() {
    return P;
  },
  get Result() {
    return r;
  },
  RightsFlags: d,
  SUBSCRIPTION_SIZE: H,
  SubscriptionClockFlags: et,
  get Whence() {
    return m;
  }
}, Symbol.toStringTag, { value: "Module" }));
var F;
(function(i) {
  i[i.CUR = 0] = "CUR", i[i.END = 1] = "END", i[i.SET = 2] = "SET";
})(F || (F = {}));
class ct {
  constructor(t) {
    _(this, "fs");
    _(this, "args");
    // Program args (like from a terminal program)
    _(this, "env");
    // Environment (like a .env file)
    _(this, "stdin");
    _(this, "stdout");
    _(this, "stderr");
    _(this, "debug");
    _(this, "isTTY");
    this.fs = (t == null ? void 0 : t.fs) ?? {}, this.args = (t == null ? void 0 : t.args) ?? [], this.env = (t == null ? void 0 : t.env) ?? {}, this.stdin = (t == null ? void 0 : t.stdin) ?? (() => null), this.stdout = (t == null ? void 0 : t.stdout) ?? (() => {
    }), this.stderr = (t == null ? void 0 : t.stderr) ?? (() => {
    }), this.debug = t == null ? void 0 : t.debug, this.isTTY = !!(t != null && t.isTTY);
  }
}
class Et {
  constructor(t) {
    _(this, "fs");
    _(this, "nextFD", 10);
    _(this, "openMap", /* @__PURE__ */ new Map());
    this.fs = { ...t }, this.openMap.set(3, new g(this.fs, "/"));
  }
  //
  // Helpers
  //
  openFile(t, e, n) {
    const s = new b(t, n);
    e && (s.buffer = new Uint8Array(new ArrayBuffer(1024), 0, 0));
    const a = this.nextFD;
    return this.openMap.set(a, s), this.nextFD++, [r.SUCCESS, a];
  }
  openDir(t, e) {
    const n = new g(t, e), s = this.nextFD;
    return this.openMap.set(s, n), this.nextFD++, [r.SUCCESS, s];
  }
  hasDir(t, e) {
    return e === "." ? !0 : t.containsDirectory(e);
  }
  //
  // Public Interface
  //
  open(t, e, n, s) {
    const a = !!(n & O.CREAT), o = !!(n & O.DIRECTORY), h = !!(n & O.EXCL), f = !!(n & O.TRUNC), c = this.openMap.get(t);
    if (!(c instanceof g))
      return [r.EBADF];
    if (c.containsFile(e))
      return o ? [r.ENOTDIR] : h ? [r.EEXIST] : this.openFile(c.get(e), f, s);
    if (this.hasDir(c, e)) {
      if (e === ".")
        return this.openDir(this.fs, "/");
      const E = `/${e}/`, S = Object.entries(this.fs).filter(([u]) => u.startsWith(E));
      return this.openDir(Object.fromEntries(S), E);
    } else {
      if (a) {
        const E = c.fullPath(e);
        return this.fs[E] = {
          path: E,
          mode: "binary",
          content: new Uint8Array(),
          timestamps: {
            access: /* @__PURE__ */ new Date(),
            modification: /* @__PURE__ */ new Date(),
            change: /* @__PURE__ */ new Date()
          }
        }, this.openFile(this.fs[E], f, s);
      }
      return [r.ENOTCAPABLE];
    }
  }
  close(t) {
    if (!this.openMap.has(t))
      return r.EBADF;
    const e = this.openMap.get(t);
    return e instanceof b && e.sync(), this.openMap.delete(t), r.SUCCESS;
  }
  read(t, e) {
    const n = this.openMap.get(t);
    return !n || n instanceof g ? [r.EBADF] : [r.SUCCESS, n.read(e)];
  }
  pread(t, e, n) {
    const s = this.openMap.get(t);
    return !s || s instanceof g ? [r.EBADF] : [r.SUCCESS, s.pread(e, n)];
  }
  write(t, e) {
    const n = this.openMap.get(t);
    return !n || n instanceof g ? r.EBADF : (n.write(e), r.SUCCESS);
  }
  pwrite(t, e, n) {
    const s = this.openMap.get(t);
    return !s || s instanceof g ? r.EBADF : (s.pwrite(e, n), r.SUCCESS);
  }
  sync(t) {
    const e = this.openMap.get(t);
    return !e || e instanceof g ? r.EBADF : (e.sync(), r.SUCCESS);
  }
  seek(t, e, n) {
    const s = this.openMap.get(t);
    return !s || s instanceof g ? [r.EBADF] : [r.SUCCESS, s.seek(e, n)];
  }
  tell(t) {
    const e = this.openMap.get(t);
    return !e || e instanceof g ? [r.EBADF] : [r.SUCCESS, e.tell()];
  }
  renumber(t, e) {
    return !this.exists(t) || !this.exists(e) ? r.EBADF : (t === e || (this.close(e), this.openMap.set(e, this.openMap.get(t))), r.SUCCESS);
  }
  unlink(t, e) {
    const n = this.openMap.get(t);
    if (!(n instanceof g))
      return r.EBADF;
    if (!n.contains(e))
      return r.ENOENT;
    for (const s of Object.keys(this.fs))
      (s === n.fullPath(e) || s.startsWith(`${n.fullPath(e)}/`)) && delete this.fs[s];
    return r.SUCCESS;
  }
  rename(t, e, n, s) {
    const a = this.openMap.get(t), o = this.openMap.get(n);
    if (!(a instanceof g) || !(o instanceof g))
      return r.EBADF;
    if (!a.contains(e))
      return r.ENOENT;
    if (o.contains(s))
      return r.EEXIST;
    const h = a.fullPath(e), f = o.fullPath(s);
    for (const c of Object.keys(this.fs))
      if (c.startsWith(h)) {
        const E = c.replace(h, f);
        this.fs[E] = this.fs[c], this.fs[E].path = E, delete this.fs[c];
      }
    return r.SUCCESS;
  }
  list(t) {
    const e = this.openMap.get(t);
    return e instanceof g ? [r.SUCCESS, e.list()] : [r.EBADF];
  }
  stat(t) {
    const e = this.openMap.get(t);
    return e instanceof b ? [r.SUCCESS, e.stat()] : [r.EBADF];
  }
  pathStat(t, e) {
    const n = this.openMap.get(t);
    if (!(n instanceof g))
      return [r.EBADF];
    if (n.containsFile(e)) {
      const s = n.fullPath(e), a = new b(this.fs[s], 0).stat();
      return [r.SUCCESS, a];
    } else if (this.hasDir(n, e)) {
      if (e === ".")
        return [r.SUCCESS, new g(this.fs, "/").stat()];
      const s = `/${e}/`, a = Object.entries(this.fs).filter(([h]) => h.startsWith(s)), o = new g(Object.fromEntries(a), s).stat();
      return [r.SUCCESS, o];
    } else
      return [r.ENOTCAPABLE];
  }
  setFlags(t, e) {
    const n = this.openMap.get(t);
    return n instanceof b ? (n.setFlags(e), r.SUCCESS) : r.EBADF;
  }
  setSize(t, e) {
    const n = this.openMap.get(t);
    return n instanceof b ? (n.setSize(Number(e)), r.SUCCESS) : r.EBADF;
  }
  setAccessTime(t, e) {
    const n = this.openMap.get(t);
    return n instanceof b ? (n.setAccessTime(e), r.SUCCESS) : r.EBADF;
  }
  setModificationTime(t, e) {
    const n = this.openMap.get(t);
    return n instanceof b ? (n.setModificationTime(e), r.SUCCESS) : r.EBADF;
  }
  pathSetAccessTime(t, e, n) {
    const s = this.openMap.get(t);
    if (!(s instanceof g))
      return r.EBADF;
    const a = s.get(e);
    if (!a)
      return r.ENOTCAPABLE;
    const o = new b(a, 0);
    return o.setAccessTime(n), o.sync(), r.SUCCESS;
  }
  pathSetModificationTime(t, e, n) {
    const s = this.openMap.get(t);
    if (!(s instanceof g))
      return r.EBADF;
    const a = s.get(e);
    if (!a)
      return r.ENOTCAPABLE;
    const o = new b(a, 0);
    return o.setModificationTime(n), o.sync(), r.SUCCESS;
  }
  pathCreateDir(t, e) {
    const n = this.openMap.get(t);
    if (!(n instanceof g))
      return r.EBADF;
    if (n.contains(e))
      return r.ENOTCAPABLE;
    const s = `${n.fullPath(e)}/.runno`;
    return this.fs[s] = {
      path: s,
      timestamps: {
        access: /* @__PURE__ */ new Date(),
        modification: /* @__PURE__ */ new Date(),
        change: /* @__PURE__ */ new Date()
      },
      mode: "string",
      content: ""
    }, r.SUCCESS;
  }
  //
  // Public Helpers
  //
  exists(t) {
    return this.openMap.has(t);
  }
  fileType(t) {
    const e = this.openMap.get(t);
    return e ? e instanceof b ? C.REGULAR_FILE : C.DIRECTORY : C.UNKNOWN;
  }
  fileFdflags(t) {
    const e = this.openMap.get(t);
    return e instanceof b ? e.fdflags : 0;
  }
}
class b {
  constructor(t, e) {
    _(this, "file");
    _(this, "buffer");
    _(this, "_offset", BigInt(0));
    _(this, "isDirty", !1);
    _(this, "fdflags");
    _(this, "flagAppend");
    _(this, "flagDSync");
    _(this, "flagNonBlock");
    _(this, "flagRSync");
    _(this, "flagSync");
    if (this.file = t, this.file.mode === "string") {
      const n = new TextEncoder();
      this.buffer = n.encode(this.file.content);
    } else
      this.buffer = this.file.content;
    this.fdflags = e, this.flagAppend = !!(e & A.APPEND), this.flagDSync = !!(e & A.DSYNC), this.flagNonBlock = !!(e & A.NONBLOCK), this.flagRSync = !!(e & A.RSYNC), this.flagSync = !!(e & A.SYNC);
  }
  get offset() {
    return Number(this._offset);
  }
  read(t) {
    const e = this.buffer.subarray(this.offset, this.offset + t);
    return this._offset += BigInt(e.length), e;
  }
  pread(t, e) {
    return this.buffer.subarray(e, e + t);
  }
  write(t) {
    if (this.isDirty = !0, this.flagAppend) {
      const e = this.buffer.length;
      this.resize(e + t.byteLength), this.buffer.set(t, e);
    } else {
      const e = Math.max(this.offset + t.byteLength, this.buffer.byteLength);
      this.resize(e), this.buffer.set(t, this.offset), this._offset += BigInt(t.byteLength);
    }
    (this.flagDSync || this.flagSync) && this.sync();
  }
  pwrite(t, e) {
    if (this.isDirty = !0, this.flagAppend) {
      const n = this.buffer.length;
      this.resize(n + t.byteLength), this.buffer.set(t, n);
    } else {
      const n = Math.max(e + t.byteLength, this.buffer.byteLength);
      this.resize(n), this.buffer.set(t, e);
    }
    (this.flagDSync || this.flagSync) && this.sync();
  }
  sync() {
    if (!this.isDirty)
      return;
    if (this.isDirty = !1, this.file.mode === "binary") {
      this.file.content = new Uint8Array(this.buffer);
      return;
    }
    const t = new TextDecoder();
    this.file.content = t.decode(this.buffer);
  }
  seek(t, e) {
    switch (e) {
      case m.SET:
        this._offset = t;
        break;
      case m.CUR:
        this._offset += t;
        break;
      case m.END:
        this._offset = BigInt(this.buffer.length) + t;
        break;
    }
    return this._offset;
  }
  tell() {
    return this._offset;
  }
  stat() {
    return {
      path: this.file.path,
      timestamps: this.file.timestamps,
      type: C.REGULAR_FILE,
      byteLength: this.buffer.length
    };
  }
  setFlags(t) {
    this.fdflags = t;
  }
  setSize(t) {
    this.resize(t);
  }
  setAccessTime(t) {
    this.file.timestamps.access = t;
  }
  setModificationTime(t) {
    this.file.timestamps.modification = t;
  }
  /**
   * Resizes the buffer to be exactly requiredBytes length, while resizing the
   * underlying buffer to be larger if necessary.
   *
   * Resizing will internally double the buffer size to reduce the need for
   * resizing often.
   *
   * @param requiredBytes how many bytes the buffer needs to have available
   */
  resize(t) {
    if (t <= this.buffer.buffer.byteLength) {
      this.buffer = new Uint8Array(this.buffer.buffer, 0, t);
      return;
    }
    let e;
    this.buffer.buffer.byteLength === 0 ? e = new ArrayBuffer(t < 1024 ? 1024 : t * 2) : t > this.buffer.buffer.byteLength * 2 ? e = new ArrayBuffer(t * 2) : e = new ArrayBuffer(this.buffer.buffer.byteLength * 2);
    const n = new Uint8Array(e, 0, t);
    n.set(this.buffer), this.buffer = n;
  }
}
function M(i, t) {
  const e = t.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&"), n = new RegExp(`^${e}`);
  return i.replace(n, "");
}
class g {
  // full folder path including /
  constructor(t, e) {
    _(this, "dir");
    _(this, "prefix");
    this.dir = t, this.prefix = e;
  }
  containsFile(t) {
    for (const e of Object.keys(this.dir))
      if (M(e, this.prefix) === t)
        return !0;
    return !1;
  }
  containsDirectory(t) {
    for (const e of Object.keys(this.dir))
      if (M(e, this.prefix).startsWith(`${t}/`))
        return !0;
    return !1;
  }
  contains(t) {
    for (const e of Object.keys(this.dir)) {
      const n = M(e, this.prefix);
      if (n === t || n.startsWith(`${t}/`))
        return !0;
    }
    return !1;
  }
  get(t) {
    return this.dir[this.fullPath(t)];
  }
  fullPath(t) {
    return `${this.prefix}${t}`;
  }
  list() {
    const t = [], e = /* @__PURE__ */ new Set();
    for (const n of Object.keys(this.dir)) {
      const s = M(n, this.prefix);
      if (s.includes("/")) {
        const a = s.split("/")[0];
        if (e.has(a))
          continue;
        e.add(a), t.push({ name: a, type: C.DIRECTORY });
      } else
        t.push({
          name: s,
          type: C.REGULAR_FILE
        });
    }
    return t;
  }
  stat() {
    return {
      path: this.prefix,
      timestamps: {
        access: /* @__PURE__ */ new Date(),
        modification: /* @__PURE__ */ new Date(),
        change: /* @__PURE__ */ new Date()
      },
      type: C.DIRECTORY,
      byteLength: 0
    };
  }
}
let K = [];
function y(i) {
  K.push(i);
}
function St() {
  const i = K;
  return K = [], i;
}
class x extends Error {
}
class X extends Error {
}
class W {
  constructor(t) {
    _(this, "instance");
    _(this, "module");
    _(this, "memory");
    _(this, "context");
    _(this, "drive");
    _(this, "hasBeenInitialized", !1);
    this.context = new ct(t), this.drive = new Et(this.context.fs);
  }
  /**
   * Start a WASI command.
   *
   */
  static async start(t, e = {}) {
    const n = new W(e), s = await WebAssembly.instantiateStreaming(t, n.getImportObject());
    return n.start(s);
  }
  /**
   * Initialize a WASI reactor.
   *
   * Returns the WebAssembly instance exports.
   */
  static async initialize(t, e = {}) {
    const n = new W(e), s = await WebAssembly.instantiateStreaming(t, n.getImportObject());
    return n.initialize(s), s.instance.exports;
  }
  getImportObject() {
    return {
      wasi_snapshot_preview1: this.getImports("preview1", this.context.debug),
      wasi_unstable: this.getImports("unstable", this.context.debug)
    };
  }
  /**
   * Start a WASI command.
   *
   * See: https://github.com/WebAssembly/WASI/blob/main/legacy/application-abi.md
   */
  start(t, e = {}) {
    if (this.hasBeenInitialized)
      throw new X("This instance has already been initialized");
    if (this.hasBeenInitialized = !0, this.instance = t.instance, this.module = t.module, this.memory = e.memory ?? this.instance.exports.memory, "_initialize" in this.instance.exports)
      throw new x("WebAssembly instance is a reactor and should be started with initialize.");
    if (!("_start" in this.instance.exports))
      throw new x("WebAssembly instance doesn't export _start, it may not be WASI or may be a Reactor.");
    const n = this.instance.exports._start;
    try {
      n();
    } catch (s) {
      if (s instanceof Z)
        return {
          exitCode: s.code,
          fs: this.drive.fs
        };
      if (s instanceof WebAssembly.RuntimeError)
        return {
          exitCode: 134,
          fs: this.drive.fs
        };
      throw s;
    }
    return {
      exitCode: 0,
      fs: this.drive.fs
    };
  }
  /**
   * Initialize a WASI Reactor.
   *
   * See: https://github.com/WebAssembly/WASI/blob/main/legacy/application-abi.md
   */
  initialize(t, e = {}) {
    if (this.hasBeenInitialized)
      throw new X("This instance has already been initialized");
    if (this.hasBeenInitialized = !0, this.instance = t.instance, this.module = t.module, this.memory = e.memory ?? this.instance.exports.memory, "_start" in this.instance.exports)
      throw new x("WebAssembly instance is a command and should be started with start.");
    if ("_initialize" in this.instance.exports) {
      const n = this.instance.exports._initialize;
      n();
    }
  }
  getImports(t, e) {
    const n = {
      args_get: this.args_get.bind(this),
      args_sizes_get: this.args_sizes_get.bind(this),
      clock_res_get: this.clock_res_get.bind(this),
      clock_time_get: this.clock_time_get.bind(this),
      environ_get: this.environ_get.bind(this),
      environ_sizes_get: this.environ_sizes_get.bind(this),
      proc_exit: this.proc_exit.bind(this),
      random_get: this.random_get.bind(this),
      sched_yield: this.sched_yield.bind(this),
      // File Descriptors
      fd_advise: this.fd_advise.bind(this),
      fd_allocate: this.fd_allocate.bind(this),
      fd_close: this.fd_close.bind(this),
      fd_datasync: this.fd_datasync.bind(this),
      fd_fdstat_get: this.fd_fdstat_get.bind(this),
      fd_fdstat_set_flags: this.fd_fdstat_set_flags.bind(this),
      fd_fdstat_set_rights: this.fd_fdstat_set_rights.bind(this),
      fd_filestat_get: this.fd_filestat_get.bind(this),
      fd_filestat_set_size: this.fd_filestat_set_size.bind(this),
      fd_filestat_set_times: this.fd_filestat_set_times.bind(this),
      fd_pread: this.fd_pread.bind(this),
      fd_prestat_dir_name: this.fd_prestat_dir_name.bind(this),
      fd_prestat_get: this.fd_prestat_get.bind(this),
      fd_pwrite: this.fd_pwrite.bind(this),
      fd_read: this.fd_read.bind(this),
      fd_readdir: this.fd_readdir.bind(this),
      fd_renumber: this.fd_renumber.bind(this),
      fd_seek: this.fd_seek.bind(this),
      fd_sync: this.fd_sync.bind(this),
      fd_tell: this.fd_tell.bind(this),
      fd_write: this.fd_write.bind(this),
      // Paths
      path_filestat_get: this.path_filestat_get.bind(this),
      path_filestat_set_times: this.path_filestat_set_times.bind(this),
      path_open: this.path_open.bind(this),
      path_rename: this.path_rename.bind(this),
      path_unlink_file: this.path_unlink_file.bind(this),
      path_create_directory: this.path_create_directory.bind(this),
      // Unimplemented
      path_link: this.path_link.bind(this),
      path_readlink: this.path_readlink.bind(this),
      path_remove_directory: this.path_remove_directory.bind(this),
      path_symlink: this.path_symlink.bind(this),
      poll_oneoff: this.poll_oneoff.bind(this),
      proc_raise: this.proc_raise.bind(this),
      sock_accept: this.sock_accept.bind(this),
      sock_recv: this.sock_recv.bind(this),
      sock_send: this.sock_send.bind(this),
      sock_shutdown: this.sock_shutdown.bind(this),
      // Unimplemented - WASMEdge compatibility
      sock_open: this.sock_open.bind(this),
      sock_listen: this.sock_listen.bind(this),
      sock_connect: this.sock_connect.bind(this),
      sock_setsockopt: this.sock_setsockopt.bind(this),
      sock_bind: this.sock_bind.bind(this),
      sock_getlocaladdr: this.sock_getlocaladdr.bind(this),
      sock_getpeeraddr: this.sock_getpeeraddr.bind(this),
      sock_getaddrinfo: this.sock_getaddrinfo.bind(this)
    };
    t === "unstable" && (n.path_filestat_get = this.unstable_path_filestat_get.bind(this), n.fd_filestat_get = this.unstable_fd_filestat_get.bind(this), n.fd_seek = this.unstable_fd_seek.bind(this));
    for (const [s, a] of Object.entries(n))
      n[s] = function() {
        let o = a.apply(this, arguments);
        if (e) {
          const h = St();
          o = e(s, [...arguments], o, h) ?? o;
        }
        return o;
      };
    return n;
  }
  //
  // Helpers
  //
  get envArray() {
    return Object.entries(this.context.env).map(([t, e]) => `${t}=${e}`);
  }
  //
  // WASI Implementation
  //
  /**
   * Read command-line argument data. The size of the array should match that
   * returned by args_sizes_get. Each argument is expected to be \0 terminated.
   */
  args_get(t, e) {
    const n = new DataView(this.memory.buffer);
    for (const s of this.context.args) {
      n.setUint32(t, e, !0), t += 4;
      const a = new TextEncoder().encode(`${s}\0`);
      new Uint8Array(this.memory.buffer, e, a.byteLength).set(a), e += a.byteLength;
    }
    return r.SUCCESS;
  }
  /**
   * Return command-line argument data sizes.
   */
  args_sizes_get(t, e) {
    const n = this.context.args, s = n.reduce((o, h) => o + new TextEncoder().encode(`${h}\0`).byteLength, 0), a = new DataView(this.memory.buffer);
    return a.setUint32(t, n.length, !0), a.setUint32(e, s, !0), r.SUCCESS;
  }
  /**
   * Return the resolution of a clock. Implementations are required to provide a
   * non-zero value for supported clocks. For unsupported clocks, return
   * errno::inval. Note: This is similar to clock_getres in POSIX.
   */
  clock_res_get(t, e) {
    switch (t) {
      case I.REALTIME:
      case I.MONOTONIC:
      case I.PROCESS_CPUTIME_ID:
      case I.THREAD_CPUTIME_ID:
        return new DataView(this.memory.buffer).setBigUint64(e, BigInt(1e6), !0), r.SUCCESS;
    }
    return r.EINVAL;
  }
  /**
   * Return the time value of a clock.
   * Note: This is similar to clock_gettime in POSIX.
   */
  clock_time_get(t, e, n) {
    switch (t) {
      case I.REALTIME:
      case I.MONOTONIC:
      case I.PROCESS_CPUTIME_ID:
      case I.THREAD_CPUTIME_ID:
        return new DataView(this.memory.buffer).setBigUint64(n, N(/* @__PURE__ */ new Date()), !0), r.SUCCESS;
    }
    return r.EINVAL;
  }
  /**
   * Read environment variable data. The sizes of the buffers should match that
   * returned by environ_sizes_get. Key/value pairs are expected to be joined
   * with =s, and terminated with \0s.
   */
  environ_get(t, e) {
    const n = new DataView(this.memory.buffer);
    for (const s of this.envArray) {
      n.setUint32(t, e, !0), t += 4;
      const a = new TextEncoder().encode(`${s}\0`);
      new Uint8Array(this.memory.buffer, e, a.byteLength).set(a), e += a.byteLength;
    }
    return r.SUCCESS;
  }
  /**
   * Return environment variable data sizes.
   */
  environ_sizes_get(t, e) {
    const n = this.envArray.reduce((a, o) => a + new TextEncoder().encode(`${o}\0`).byteLength, 0), s = new DataView(this.memory.buffer);
    return s.setUint32(t, this.envArray.length, !0), s.setUint32(e, n, !0), r.SUCCESS;
  }
  /**
   * Terminate the process normally. An exit code of 0 indicates successful
   * termination of the program. The meanings of other values is dependent on
   * the environment.
   */
  proc_exit(t) {
    throw new Z(t);
  }
  /**
   * Write high-quality random data into a buffer. This function blocks when the
   * implementation is unable to immediately provide sufficient high-quality
   * random data. This function may execute slowly, so when large mounts of
   * random data are required, it's advisable to use this function to seed a
   * pseudo-random number generator, rather than to provide the random data
   * directly.
   */
  random_get(t, e) {
    const n = new Uint8Array(this.memory.buffer, t, e);
    return globalThis.crypto.getRandomValues(n), r.SUCCESS;
  }
  /**
   * Temporarily yield execution of the calling thread.
   * Note: This is similar to sched_yield in POSIX.
   */
  sched_yield() {
    return r.SUCCESS;
  }
  //
  // File Descriptors
  //
  /**
   * Read from a file descriptor. Note: This is similar to readv in POSIX.
   */
  fd_read(t, e, n, s) {
    if (t === 1 || t === 2)
      return r.ENOTSUP;
    const a = new DataView(this.memory.buffer), o = R(a, e, n), h = new TextEncoder();
    let f = 0, c = r.SUCCESS;
    for (const E of o) {
      let S;
      if (t === 0) {
        const T = this.context.stdin(E.byteLength);
        if (!T)
          break;
        S = h.encode(T);
      } else {
        const [T, U] = this.drive.read(t, E.byteLength);
        if (T) {
          c = T;
          break;
        } else
          S = U;
      }
      const u = Math.min(E.byteLength, S.byteLength);
      E.set(S.subarray(0, u)), f += u;
    }
    return y({ bytesRead: f }), a.setUint32(s, f, !0), c;
  }
  /**
   * Write to a file descriptor. Note: This is similar to writev in POSIX.
   */
  fd_write(t, e, n, s) {
    if (t === 0)
      return r.ENOTSUP;
    const a = new DataView(this.memory.buffer), o = R(a, e, n), h = new TextDecoder();
    let f = 0, c = r.SUCCESS;
    for (const E of o)
      if (E.byteLength !== 0) {
        if (t === 1 || t === 2) {
          const S = t === 1 ? this.context.stdout : this.context.stderr, u = h.decode(E);
          S(u), y({ output: u });
        } else if (c = this.drive.write(t, E), c != r.SUCCESS)
          break;
        f += E.byteLength;
      }
    return a.setUint32(s, f, !0), c;
  }
  /**
   * Provide file advisory information on a file descriptor.
   * Note: This is similar to posix_fadvise in POSIX.
   */
  fd_advise() {
    return r.SUCCESS;
  }
  /**
   * Force the allocation of space in a file.
   * Note: This is similar to posix_fallocate in POSIX.
   */
  fd_allocate(t, e, n) {
    return this.drive.pwrite(t, new Uint8Array(Number(n)), Number(e));
  }
  /**
   * Close a file descriptor.
   * Note: This is similar to close in POSIX.
   *
   * @param fd
   */
  fd_close(t) {
    return this.drive.close(t);
  }
  /**
   * Synchronize the data of a file to disk.
   * Note: This is similar to fdatasync in POSIX.
   *
   * @param fd
   */
  fd_datasync(t) {
    return this.drive.sync(t);
  }
  /**
   * Get the attributes of a file descriptor.
   * Note: This returns similar flags to fsync(fd, F_GETFL) in POSIX,
   * as well as additional fields.
   *
   * Returns fdstat - the buffer where the file descriptor's attributes
   * are stored.
   *
   * @returns Result<fdstat, errno>
   */
  fd_fdstat_get(t, e) {
    if (t < 3) {
      let h;
      if (this.context.isTTY) {
        const c = z ^ d.FD_SEEK ^ d.FD_TELL;
        h = Y(C.CHARACTER_DEVICE, 0, c);
      } else
        h = Y(C.CHARACTER_DEVICE, 0);
      return new Uint8Array(this.memory.buffer, e, h.byteLength).set(h), r.SUCCESS;
    }
    if (!this.drive.exists(t))
      return r.EBADF;
    const n = this.drive.fileType(t), s = this.drive.fileFdflags(t), a = Y(n, s);
    return new Uint8Array(this.memory.buffer, e, a.byteLength).set(a), r.SUCCESS;
  }
  /**
   * Adjust the flags associated with a file descriptor.
   * Note: This is similar to fcntl(fd, F_SETFL, flags) in POSIX.
   */
  fd_fdstat_set_flags(t, e) {
    return this.drive.setFlags(t, e);
  }
  /**
   * Adjust the rights associated with a file descriptor. This can only be used
   * to remove rights, and returns errno::notcapable if called in a way that
   * would attempt to add rights
   */
  fd_fdstat_set_rights() {
    return r.SUCCESS;
  }
  /**
   * Return the attributes of an open file.
   */
  fd_filestat_get(t, e) {
    return this.shared_fd_filestat_get(t, e, "preview1");
  }
  /**
   * Return the attributes of an open file.
   * This version is used
   */
  unstable_fd_filestat_get(t, e) {
    return this.shared_fd_filestat_get(t, e, "unstable");
  }
  /**
   * Return the attributes of an open file.
   */
  shared_fd_filestat_get(t, e, n) {
    const s = n === "unstable" ? J : Q;
    if (t < 3) {
      let c;
      switch (t) {
        case 0:
          c = "/dev/stdin";
          break;
        case 1:
          c = "/dev/stdout";
          break;
        case 2:
          c = "/dev/stderr";
          break;
        default:
          c = "/dev/undefined";
          break;
      }
      const E = s({
        path: c,
        byteLength: 0,
        timestamps: {
          access: /* @__PURE__ */ new Date(),
          modification: /* @__PURE__ */ new Date(),
          change: /* @__PURE__ */ new Date()
        },
        type: C.CHARACTER_DEVICE
      });
      return new Uint8Array(this.memory.buffer, e, E.byteLength).set(E), r.SUCCESS;
    }
    const [a, o] = this.drive.stat(t);
    if (a != r.SUCCESS)
      return a;
    y({ resolvedPath: o.path, stat: o });
    const h = s(o);
    return new Uint8Array(this.memory.buffer, e, h.byteLength).set(h), r.SUCCESS;
  }
  /**
   * Adjust the size of an open file. If this increases the file's size, the
   * extra bytes are filled with zeros. Note: This is similar to ftruncate in
   * POSIX.
   */
  fd_filestat_set_size(t, e) {
    return this.drive.setSize(t, e);
  }
  /**
   * Adjust the timestamps of an open file or directory.
   * Note: This is similar to futimens in POSIX.
   */
  fd_filestat_set_times(t, e, n, s) {
    let a = null;
    s & D.ATIM && (a = w(e)), s & D.ATIM_NOW && (a = /* @__PURE__ */ new Date());
    let o = null;
    if (s & D.MTIM && (o = w(n)), s & D.MTIM_NOW && (o = /* @__PURE__ */ new Date()), a) {
      const h = this.drive.setAccessTime(t, a);
      if (h != r.SUCCESS)
        return h;
    }
    if (o) {
      const h = this.drive.setModificationTime(t, o);
      if (h != r.SUCCESS)
        return h;
    }
    return r.SUCCESS;
  }
  /**
   * Read from a file descriptor, without using and updating the file
   * descriptor's offset. Note: This is similar to preadv in POSIX.
   */
  fd_pread(t, e, n, s, a) {
    if (t === 1 || t === 2)
      return r.ENOTSUP;
    if (t === 0)
      return this.fd_read(t, e, n, a);
    const o = new DataView(this.memory.buffer), h = R(o, e, n);
    let f = 0, c = r.SUCCESS;
    for (const E of h) {
      const [S, u] = this.drive.pread(t, E.byteLength, Number(s) + f);
      if (S !== r.SUCCESS) {
        c = S;
        break;
      }
      const T = Math.min(E.byteLength, u.byteLength);
      E.set(u.subarray(0, T)), f += T;
    }
    return o.setUint32(a, f, !0), c;
  }
  /**
   * Return a description of the given preopened file descriptor.
   */
  fd_prestat_dir_name(t, e, n) {
    if (t !== 3)
      return r.EBADF;
    const s = new TextEncoder().encode("/");
    return new Uint8Array(this.memory.buffer, e, n).set(s.subarray(0, n)), r.SUCCESS;
  }
  /**
   * Return a description of the given preopened file descriptor.
   */
  fd_prestat_get(t, e) {
    if (t !== 3)
      return r.EBADF;
    const n = new TextEncoder().encode("."), s = new DataView(this.memory.buffer, e);
    return s.setUint8(0, P.DIR), s.setUint32(4, n.byteLength, !0), r.SUCCESS;
  }
  /**
   * Write to a file descriptor, without using and updating the file
   * descriptor's offset. Note: This is similar to pwritev in POSIX.
   */
  fd_pwrite(t, e, n, s, a) {
    if (t === 0)
      return r.ENOTSUP;
    if (t === 1 || t === 2)
      return this.fd_write(t, e, n, a);
    const o = new DataView(this.memory.buffer), h = R(o, e, n);
    let f = 0, c = r.SUCCESS;
    for (const E of h)
      if (E.byteLength !== 0) {
        if (c = this.drive.pwrite(t, E, Number(s)), c != r.SUCCESS)
          break;
        f += E.byteLength;
      }
    return o.setUint32(a, f, !0), c;
  }
  /**
   * Read directory entries from a directory. When successful, the contents of
   * the output buffer consist of a sequence of directory entries. Each
   * directory entry consists of a dirent object, followed by dirent::d_namlen
   * bytes holding the name of the directory entry. This function fills the
   * output buffer as much as possible, potentially truncating the last
   * directory entry. This allows the caller to grow its read buffer size in
   * case it's too small to fit a single large directory entry, or skip the
   * oversized directory entry.
   */
  fd_readdir(t, e, n, s, a) {
    const [o, h] = this.drive.list(t);
    if (o != r.SUCCESS)
      return o;
    let f = [], c = 0;
    for (const { name: p, type: B } of h) {
      const k = dt(p, B, c);
      f.push(k), c++;
    }
    f = f.slice(Number(s));
    const E = f.reduce((p, B) => p + B.byteLength, 0), S = new Uint8Array(E);
    let u = 0;
    for (const p of f)
      S.set(p, u), u += p.byteLength;
    const T = new Uint8Array(this.memory.buffer, e, n), U = S.subarray(0, n);
    return T.set(U), new DataView(this.memory.buffer).setUint32(a, U.byteLength, !0), r.SUCCESS;
  }
  /**
   * Atomically replace a file descriptor by renumbering another file
   * descriptor. Due to the strong focus on thread safety, this environment does
   * not provide a mechanism to duplicate or renumber a file descriptor to an
   * arbitrary number, like dup2(). This would be prone to race conditions, as
   * an actual file descriptor with the same number could be allocated by a
   * different thread at the same time. This function provides a way to
   * atomically renumber file descriptors, which would disappear if dup2() were
   * to be removed entirely.
   */
  fd_renumber(t, e) {
    return this.drive.renumber(t, e);
  }
  /**
   * Move the offset of a file descriptor.
   *
   * The offset is specified as a bigint here
   * Note: This is similar to lseek in POSIX.
   *
   * The offset, and return type are FileSize (u64) which is represented by
   * bigint in JavaScript.
   */
  fd_seek(t, e, n, s) {
    const [a, o] = this.drive.seek(t, e, n);
    return a !== r.SUCCESS || (y({ newOffset: o.toString() }), new DataView(this.memory.buffer).setBigUint64(s, o, !0)), a;
  }
  unstable_fd_seek(t, e, n, s) {
    const a = gt[n];
    return this.fd_seek(t, e, a, s);
  }
  /**
   * Synchronize the data and metadata of a file to disk.
   * Note: This is similar to fsync in POSIX.
   */
  fd_sync(t) {
    return this.drive.sync(t);
  }
  /**
   * Return the current offset of a file descriptor.
   * Note: This is similar to lseek(fd, 0, SEEK_CUR) in POSIX.
   *
   * The return type is FileSize (u64) which is represented by bigint in JS.
   *
   */
  fd_tell(t, e) {
    const [n, s] = this.drive.tell(t);
    return n !== r.SUCCESS || new DataView(this.memory.buffer).setBigUint64(e, s, !0), n;
  }
  //
  // Paths
  //
  path_filestat_get(t, e, n, s, a) {
    return this.shared_path_filestat_get(t, e, n, s, a, "preview1");
  }
  unstable_path_filestat_get(t, e, n, s, a) {
    return this.shared_path_filestat_get(t, e, n, s, a, "unstable");
  }
  /**
   * Return the attributes of a file or directory.
   * Note: This is similar to stat in POSIX.
   */
  shared_path_filestat_get(t, e, n, s, a, o) {
    const h = o === "unstable" ? J : Q, f = new TextDecoder().decode(new Uint8Array(this.memory.buffer, n, s));
    y({ path: f });
    const [c, E] = this.drive.pathStat(t, f);
    if (c != r.SUCCESS)
      return c;
    const S = h(E);
    return new Uint8Array(this.memory.buffer, a, S.byteLength).set(S), c;
  }
  /**
   * Adjust the timestamps of a file or directory.
   * Note: This is similar to utimensat in POSIX.
   */
  path_filestat_set_times(t, e, n, s, a, o, h) {
    let f = null;
    h & D.ATIM && (f = w(a)), h & D.ATIM_NOW && (f = /* @__PURE__ */ new Date());
    let c = null;
    h & D.MTIM && (c = w(o)), h & D.MTIM_NOW && (c = /* @__PURE__ */ new Date());
    const E = new TextDecoder().decode(new Uint8Array(this.memory.buffer, n, s));
    if (f) {
      const S = this.drive.pathSetAccessTime(t, E, f);
      if (S != r.SUCCESS)
        return S;
    }
    if (c) {
      const S = this.drive.pathSetModificationTime(t, E, c);
      if (S != r.SUCCESS)
        return S;
    }
    return r.SUCCESS;
  }
  /**
   * Open a file or directory. The returned file descriptor is not guaranteed to
   * be the lowest-numbered file descriptor not currently open; it is randomized
   * to prevent applications from depending on making assumptions about indexes,
   * since this is error-prone in multi-threaded contexts. The returned file
   * descriptor is guaranteed to be less than 2**31.
   * Note: This is similar to openat in POSIX.
   * @param fd: fd
   * @param dirflags: lookupflags Flags determining the method of how the path
   *                  is resolved. Not supported by Runno (symlinks)
   * @param path: string The relative path of the file or directory to open,
   *              relative to the path_open::fd directory.
   * @param oflags: oflags The method by which to open the file.
   * @param fs_rights_base: rights The initial rights of the newly created file
   *                        descriptor. The implementation is allowed to return
   *                        a file descriptor with fewer rights than specified,
   *                        if and only if those rights do not apply to the type
   *                        of file being opened. The base rights are rights
   *                        that will apply to operations using the file
   *                        descriptor itself, while the inheriting rights are
   *                        rights that apply to file descriptors derived from
   *                        it.
   * @param fs_rights_inheriting: rights
   * @param fdflags: fdflags
   *
   */
  path_open(t, e, n, s, a, o, h, f, c) {
    const E = new DataView(this.memory.buffer), S = L(this.memory, n, s), u = !!(a & O.CREAT), T = !!(a & O.DIRECTORY), U = !!(a & O.EXCL), $ = !!(a & O.TRUNC), p = !!(f & A.APPEND), B = !!(f & A.DSYNC), k = !!(f & A.NONBLOCK), nt = !!(f & A.RSYNC), st = !!(f & A.SYNC);
    y({
      path: S,
      openFlags: {
        createFileIfNone: u,
        failIfNotDir: T,
        failIfFileExists: U,
        truncateFile: $
      },
      fileDescriptorFlags: {
        flagAppend: p,
        flagDSync: B,
        flagNonBlock: k,
        flagRSync: nt,
        flagSync: st
      }
    });
    const [v, rt] = this.drive.open(t, S, a, f);
    return v || (E.setUint32(c, rt, !0), v);
  }
  /**
   * Rename a file or directory. Note: This is similar to renameat in POSIX.
   */
  path_rename(t, e, n, s, a, o) {
    const h = L(this.memory, e, n), f = L(this.memory, a, o);
    return y({ oldPath: h, newPath: f }), this.drive.rename(t, h, s, f);
  }
  /**
   * Unlink a file. Return errno::isdir if the path refers to a directory.
   * Note: This is similar to unlinkat(fd, path, 0) in POSIX.
   */
  path_unlink_file(t, e, n) {
    const s = L(this.memory, e, n);
    return y({ path: s }), this.drive.unlink(t, s);
  }
  /**
   * Concurrently poll for the occurrence of a set of events.
   */
  poll_oneoff(t, e, n, s) {
    for (let o = 0; o < n; o++) {
      const h = new Uint8Array(this.memory.buffer, t + o * H, H), f = _t(h), c = new Uint8Array(this.memory.buffer, e + o * V, V);
      let E = 0, S = r.SUCCESS;
      switch (f.type) {
        case l.CLOCK:
          for (; /* @__PURE__ */ new Date() < f.timeout; )
            ;
          c.set(ut(f.userdata, r.SUCCESS));
          break;
        case l.FD_READ:
          if (f.fd < 3)
            f.fd === 0 ? (S = r.SUCCESS, E = 32) : S = r.EBADF;
          else {
            const [u, T] = this.drive.stat(f.fd);
            S = u, E = T ? T.byteLength : 0;
          }
          c.set(q(f.userdata, S, l.FD_READ, BigInt(E)));
          break;
        case l.FD_WRITE:
          if (E = 0, S = r.SUCCESS, f.fd < 3)
            f.fd === 0 ? S = r.EBADF : (S = r.SUCCESS, E = 1024);
          else {
            const [u, T] = this.drive.stat(f.fd);
            S = u, E = T ? T.byteLength : 0;
          }
          c.set(q(f.userdata, S, l.FD_READ, BigInt(E)));
          break;
      }
    }
    return new DataView(this.memory.buffer, s, 4).setUint32(0, n, !0), r.SUCCESS;
  }
  /**
   * Create a directory. Note: This is similar to mkdirat in POSIX.
   */
  path_create_directory(t, e, n) {
    const s = L(this.memory, e, n);
    return this.drive.pathCreateDir(t, s);
  }
  //
  // Unimplemented - these operations are not supported by Runno
  //
  /**
   * Create a hard link. Note: This is similar to linkat in POSIX.
   */
  path_link() {
    return r.ENOSYS;
  }
  /**
   * Read the contents of a symbolic link.
   * Note: This is similar to readlinkat in POSIX.
   */
  path_readlink() {
    return r.ENOSYS;
  }
  /**
   * Remove a directory. Return errno::notempty if the directory is not empty.
   * Note: This is similar to unlinkat(fd, path, AT_REMOVEDIR) in POSIX.
   */
  path_remove_directory() {
    return r.ENOSYS;
  }
  /**
   * Create a symbolic link. Note: This is similar to symlinkat in POSIX.
   */
  path_symlink() {
    return r.ENOSYS;
  }
  /**
   * Send a signal to the process of the calling thread.
   * Note: This is similar to raise in POSIX.
   */
  proc_raise() {
    return r.ENOSYS;
  }
  /**
   * Accept a new incoming connection. Note: This is similar to accept in POSIX.
   */
  sock_accept() {
    return r.ENOSYS;
  }
  /**
   * Receive a message from a socket. Note: This is similar to recv in POSIX,
   * though it also supports reading the data into multiple buffers in the
   * manner of readv.
   */
  sock_recv() {
    return r.ENOSYS;
  }
  /**
   * Send a message on a socket. Note: This is similar to send in POSIX, though
   * it also supports writing the data from multiple buffers in the manner of
   * writev.
   */
  sock_send() {
    return r.ENOSYS;
  }
  /**
   * Shut down socket send and receive channels. Note: This is similar to
   * shutdown in POSIX.
   */
  sock_shutdown() {
    return r.ENOSYS;
  }
  //
  // Unimplemented - these are for compatibility with Wasmedge
  //
  sock_open() {
    return r.ENOSYS;
  }
  sock_listen() {
    return r.ENOSYS;
  }
  sock_connect() {
    return r.ENOSYS;
  }
  sock_setsockopt() {
    return r.ENOSYS;
  }
  sock_bind() {
    return r.ENOSYS;
  }
  sock_getlocaladdr() {
    return r.ENOSYS;
  }
  sock_getpeeraddr() {
    return r.ENOSYS;
  }
  sock_getaddrinfo() {
    return r.ENOSYS;
  }
}
const z = d.FD_DATASYNC | d.FD_READ | d.FD_SEEK | d.FD_FDSTAT_SET_FLAGS | d.FD_SYNC | d.FD_TELL | d.FD_WRITE | d.FD_ADVISE | d.FD_ALLOCATE | d.PATH_CREATE_DIRECTORY | d.PATH_CREATE_FILE | d.PATH_LINK_SOURCE | d.PATH_LINK_TARGET | d.PATH_OPEN | d.FD_READDIR | d.PATH_READLINK | d.PATH_RENAME_SOURCE | d.PATH_RENAME_TARGET | d.PATH_FILESTAT_GET | d.PATH_FILESTAT_SET_SIZE | d.PATH_FILESTAT_SET_TIMES | d.FD_FILESTAT_GET | d.FD_FILESTAT_SET_SIZE | d.FD_FILESTAT_SET_TIMES | d.PATH_SYMLINK | d.PATH_REMOVE_DIRECTORY | d.PATH_UNLINK_FILE | d.POLL_FD_READWRITE | d.SOCK_SHUTDOWN | d.SOCK_ACCEPT;
class Z extends Error {
  constructor(e) {
    super();
    _(this, "code");
    this.code = e;
  }
}
function L(i, t, e) {
  return new TextDecoder().decode(new Uint8Array(i.buffer, t, e));
}
function R(i, t, e) {
  let n = Array(e);
  for (let s = 0; s < e; s++) {
    const a = i.getUint32(t, !0);
    t += 4;
    const o = i.getUint32(t, !0);
    t += 4, n[s] = new Uint8Array(i.buffer, a, o);
  }
  return n;
}
function _t(i) {
  const t = new Uint8Array(8);
  t.set(i.subarray(0, 8));
  const e = i[8], n = new DataView(i.buffer, i.byteOffset + 9);
  switch (e) {
    case l.FD_READ:
    case l.FD_WRITE:
      return {
        userdata: t,
        type: e,
        fd: n.getUint32(0, !0)
      };
    case l.CLOCK:
      const s = n.getUint16(24, !0), a = N(/* @__PURE__ */ new Date()), o = n.getBigUint64(8, !0), h = n.getBigUint64(16, !0), f = s & et.SUBSCRIPTION_CLOCK_ABSTIME ? o : a + o;
      return {
        userdata: t,
        type: e,
        id: n.getUint32(0, !0),
        timeout: w(f),
        precision: w(f + h)
      };
  }
}
function Q(i) {
  const t = new Uint8Array(G), e = new DataView(t.buffer);
  return e.setBigUint64(0, BigInt(0), !0), e.setBigUint64(8, BigInt(j(i.path)), !0), e.setUint8(16, i.type), e.setBigUint64(24, BigInt(1), !0), e.setBigUint64(32, BigInt(i.byteLength), !0), e.setBigUint64(40, N(i.timestamps.access), !0), e.setBigUint64(48, N(i.timestamps.modification), !0), e.setBigUint64(56, N(i.timestamps.change), !0), t;
}
function J(i) {
  const t = new Uint8Array(G), e = new DataView(t.buffer);
  return e.setBigUint64(0, BigInt(0), !0), e.setBigUint64(8, BigInt(j(i.path)), !0), e.setUint8(16, i.type), e.setUint32(20, 1, !0), e.setBigUint64(24, BigInt(i.byteLength), !0), e.setBigUint64(32, N(i.timestamps.access), !0), e.setBigUint64(40, N(i.timestamps.modification), !0), e.setBigUint64(48, N(i.timestamps.change), !0), t;
}
function Y(i, t, e) {
  const n = e ?? z, s = e ?? z, a = new Uint8Array(24), o = new DataView(a.buffer, 0, 24);
  return o.setUint8(0, i), o.setUint32(2, t, !0), o.setBigUint64(8, n, !0), o.setBigUint64(16, s, !0), a;
}
function dt(i, t, e) {
  const n = new TextEncoder().encode(i), s = 24 + n.byteLength, a = new Uint8Array(s), o = new DataView(a.buffer);
  return o.setBigUint64(0, BigInt(e + 1), !0), o.setBigUint64(8, BigInt(j(i)), !0), o.setUint32(16, n.length, !0), o.setUint8(20, t), a.set(n, 24), a;
}
function ut(i, t) {
  const e = new Uint8Array(32);
  e.set(i, 0);
  const n = new DataView(e.buffer);
  return n.setUint16(8, t, !0), n.setUint16(10, l.CLOCK, !0), e;
}
function q(i, t, e, n) {
  const s = new Uint8Array(32);
  s.set(i, 0);
  const a = new DataView(s.buffer);
  return a.setUint16(8, t, !0), a.setUint16(10, e, !0), a.setBigUint64(16, n, !0), s;
}
function j(i, t = 0) {
  let e = 3735928559 ^ t, n = 1103547991 ^ t;
  for (let s = 0, a; s < i.length; s++)
    a = i.charCodeAt(s), e = Math.imul(e ^ a, 2654435761), n = Math.imul(n ^ a, 1597334677);
  return e = Math.imul(e ^ e >>> 16, 2246822507) ^ Math.imul(n ^ n >>> 13, 3266489909), n = Math.imul(n ^ n >>> 16, 2246822507) ^ Math.imul(e ^ e >>> 13, 3266489909), 4294967296 * (2097151 & n) + (e >>> 0);
}
function N(i) {
  return BigInt(i.getTime()) * BigInt(1e6);
}
function w(i) {
  return new Date(Number(i / BigInt(1e6)));
}
const gt = {
  [F.CUR]: m.CUR,
  [F.END]: m.END,
  [F.SET]: m.SET
}, it = 'var Tt=Object.defineProperty;var Ct=(s,C,b)=>C in s?Tt(s,C,{enumerable:!0,configurable:!0,writable:!0,value:b}):s[C]=b;var d=(s,C,b)=>Ct(s,typeof C!="symbol"?C+"":C,b);(function(){"use strict";var s=(e=>(e[e.SUCCESS=0]="SUCCESS",e[e.E2BIG=1]="E2BIG",e[e.EACCESS=2]="EACCESS",e[e.EADDRINUSE=3]="EADDRINUSE",e[e.EADDRNOTAVAIL=4]="EADDRNOTAVAIL",e[e.EAFNOSUPPORT=5]="EAFNOSUPPORT",e[e.EAGAIN=6]="EAGAIN",e[e.EALREADY=7]="EALREADY",e[e.EBADF=8]="EBADF",e[e.EBADMSG=9]="EBADMSG",e[e.EBUSY=10]="EBUSY",e[e.ECANCELED=11]="ECANCELED",e[e.ECHILD=12]="ECHILD",e[e.ECONNABORTED=13]="ECONNABORTED",e[e.ECONNREFUSED=14]="ECONNREFUSED",e[e.ECONNRESET=15]="ECONNRESET",e[e.EDEADLK=16]="EDEADLK",e[e.EDESTADDRREQ=17]="EDESTADDRREQ",e[e.EDOM=18]="EDOM",e[e.EDQUOT=19]="EDQUOT",e[e.EEXIST=20]="EEXIST",e[e.EFAULT=21]="EFAULT",e[e.EFBIG=22]="EFBIG",e[e.EHOSTUNREACH=23]="EHOSTUNREACH",e[e.EIDRM=24]="EIDRM",e[e.EILSEQ=25]="EILSEQ",e[e.EINPROGRESS=26]="EINPROGRESS",e[e.EINTR=27]="EINTR",e[e.EINVAL=28]="EINVAL",e[e.EIO=29]="EIO",e[e.EISCONN=30]="EISCONN",e[e.EISDIR=31]="EISDIR",e[e.ELOOP=32]="ELOOP",e[e.EMFILE=33]="EMFILE",e[e.EMLINK=34]="EMLINK",e[e.EMSGSIZE=35]="EMSGSIZE",e[e.EMULTIHOP=36]="EMULTIHOP",e[e.ENAMETOOLONG=37]="ENAMETOOLONG",e[e.ENETDOWN=38]="ENETDOWN",e[e.ENETRESET=39]="ENETRESET",e[e.ENETUNREACH=40]="ENETUNREACH",e[e.ENFILE=41]="ENFILE",e[e.ENOBUFS=42]="ENOBUFS",e[e.ENODEV=43]="ENODEV",e[e.ENOENT=44]="ENOENT",e[e.ENOEXEC=45]="ENOEXEC",e[e.ENOLCK=46]="ENOLCK",e[e.ENOLINK=47]="ENOLINK",e[e.ENOMEM=48]="ENOMEM",e[e.ENOMSG=49]="ENOMSG",e[e.ENOPROTOOPT=50]="ENOPROTOOPT",e[e.ENOSPC=51]="ENOSPC",e[e.ENOSYS=52]="ENOSYS",e[e.ENOTCONN=53]="ENOTCONN",e[e.ENOTDIR=54]="ENOTDIR",e[e.ENOTEMPTY=55]="ENOTEMPTY",e[e.ENOTRECOVERABLE=56]="ENOTRECOVERABLE",e[e.ENOTSOCK=57]="ENOTSOCK",e[e.ENOTSUP=58]="ENOTSUP",e[e.ENOTTY=59]="ENOTTY",e[e.ENXIO=60]="ENXIO",e[e.EOVERFLOW=61]="EOVERFLOW",e[e.EOWNERDEAD=62]="EOWNERDEAD",e[e.EPERM=63]="EPERM",e[e.EPIPE=64]="EPIPE",e[e.EPROTO=65]="EPROTO",e[e.EPROTONOSUPPORT=66]="EPROTONOSUPPORT",e[e.EPROTOTYPE=67]="EPROTOTYPE",e[e.ERANGE=68]="ERANGE",e[e.EROFS=69]="EROFS",e[e.ESPIPE=70]="ESPIPE",e[e.ESRCH=71]="ESRCH",e[e.ESTALE=72]="ESTALE",e[e.ETIMEDOUT=73]="ETIMEDOUT",e[e.ETXTBSY=74]="ETXTBSY",e[e.EXDEV=75]="EXDEV",e[e.ENOTCAPABLE=76]="ENOTCAPABLE",e))(s||{}),C=(e=>(e[e.REALTIME=0]="REALTIME",e[e.MONOTONIC=1]="MONOTONIC",e[e.PROCESS_CPUTIME_ID=2]="PROCESS_CPUTIME_ID",e[e.THREAD_CPUTIME_ID=3]="THREAD_CPUTIME_ID",e))(C||{}),b=(e=>(e[e.SET=0]="SET",e[e.CUR=1]="CUR",e[e.END=2]="END",e))(b||{}),D=(e=>(e[e.UNKNOWN=0]="UNKNOWN",e[e.BLOCK_DEVICE=1]="BLOCK_DEVICE",e[e.CHARACTER_DEVICE=2]="CHARACTER_DEVICE",e[e.DIRECTORY=3]="DIRECTORY",e[e.REGULAR_FILE=4]="REGULAR_FILE",e[e.SOCKET_DGRAM=5]="SOCKET_DGRAM",e[e.SOCKET_STREAM=6]="SOCKET_STREAM",e[e.SYMBOLIC_LINK=7]="SYMBOLIC_LINK",e))(D||{}),G=(e=>(e[e.DIR=0]="DIR",e))(G||{}),A=(e=>(e[e.CLOCK=0]="CLOCK",e[e.FD_READ=1]="FD_READ",e[e.FD_WRITE=2]="FD_WRITE",e))(A||{});const O={CREAT:1,DIRECTORY:2,EXCL:4,TRUNC:8},m={APPEND:1,DSYNC:2,NONBLOCK:4,RSYNC:8,SYNC:16},_={FD_DATASYNC:BigInt(1)<<BigInt(0),FD_READ:BigInt(1)<<BigInt(1),FD_SEEK:BigInt(1)<<BigInt(2),FD_FDSTAT_SET_FLAGS:BigInt(1)<<BigInt(3),FD_SYNC:BigInt(1)<<BigInt(4),FD_TELL:BigInt(1)<<BigInt(5),FD_WRITE:BigInt(1)<<BigInt(6),FD_ADVISE:BigInt(1)<<BigInt(7),FD_ALLOCATE:BigInt(1)<<BigInt(8),PATH_CREATE_DIRECTORY:BigInt(1)<<BigInt(9),PATH_CREATE_FILE:BigInt(1)<<BigInt(10),PATH_LINK_SOURCE:BigInt(1)<<BigInt(11),PATH_LINK_TARGET:BigInt(1)<<BigInt(12),PATH_OPEN:BigInt(1)<<BigInt(13),FD_READDIR:BigInt(1)<<BigInt(14),PATH_READLINK:BigInt(1)<<BigInt(15),PATH_RENAME_SOURCE:BigInt(1)<<BigInt(16),PATH_RENAME_TARGET:BigInt(1)<<BigInt(17),PATH_FILESTAT_GET:BigInt(1)<<BigInt(18),PATH_FILESTAT_SET_SIZE:BigInt(1)<<BigInt(19),PATH_FILESTAT_SET_TIMES:BigInt(1)<<BigInt(20),FD_FILESTAT_GET:BigInt(1)<<BigInt(21),FD_FILESTAT_SET_SIZE:BigInt(1)<<BigInt(22),FD_FILESTAT_SET_TIMES:BigInt(1)<<BigInt(23),PATH_SYMLINK:BigInt(1)<<BigInt(24),PATH_REMOVE_DIRECTORY:BigInt(1)<<BigInt(25),PATH_UNLINK_FILE:BigInt(1)<<BigInt(26),POLL_FD_READWRITE:BigInt(1)<<BigInt(27),SOCK_SHUTDOWN:BigInt(1)<<BigInt(28),SOCK_ACCEPT:BigInt(1)<<BigInt(29)},N={ATIM:1,ATIM_NOW:2,MTIM:4,MTIM_NOW:8},it={SUBSCRIPTION_CLOCK_ABSTIME:1},W=64,$=48,j=32;var M=(e=>(e[e.CUR=0]="CUR",e[e.END=1]="END",e[e.SET=2]="SET",e))(M||{});class X{constructor(t){d(this,"fs");d(this,"args");d(this,"env");d(this,"stdin");d(this,"stdout");d(this,"stderr");d(this,"debug");d(this,"isTTY");this.fs=(t==null?void 0:t.fs)??{},this.args=(t==null?void 0:t.args)??[],this.env=(t==null?void 0:t.env)??{},this.stdin=(t==null?void 0:t.stdin)??(()=>null),this.stdout=(t==null?void 0:t.stdout)??(()=>{}),this.stderr=(t==null?void 0:t.stderr)??(()=>{}),this.debug=t==null?void 0:t.debug,this.isTTY=!!(t!=null&&t.isTTY)}}class nt{constructor(t){d(this,"fs");d(this,"nextFD",10);d(this,"openMap",new Map);this.fs={...t},this.openMap.set(3,new u(this.fs,"/"))}openFile(t,i,n){const r=new I(t,n);i&&(r.buffer=new Uint8Array(new ArrayBuffer(1024),0,0));const a=this.nextFD;return this.openMap.set(a,r),this.nextFD++,[s.SUCCESS,a]}openDir(t,i){const n=new u(t,i),r=this.nextFD;return this.openMap.set(r,n),this.nextFD++,[s.SUCCESS,r]}hasDir(t,i){return i==="."?!0:t.containsDirectory(i)}open(t,i,n,r){const a=!!(n&O.CREAT),f=!!(n&O.DIRECTORY),c=!!(n&O.EXCL),o=!!(n&O.TRUNC),E=this.openMap.get(t);if(!(E instanceof u))return[s.EBADF];if(E.containsFile(i))return f?[s.ENOTDIR]:c?[s.EEXIST]:this.openFile(E.get(i),o,r);if(this.hasDir(E,i)){if(i===".")return this.openDir(this.fs,"/");const h=`/${i}/`,S=Object.entries(this.fs).filter(([g])=>g.startsWith(h));return this.openDir(Object.fromEntries(S),h)}else{if(a){const h=E.fullPath(i);return this.fs[h]={path:h,mode:"binary",content:new Uint8Array,timestamps:{access:new Date,modification:new Date,change:new Date}},this.openFile(this.fs[h],o,r)}return[s.ENOTCAPABLE]}}close(t){if(!this.openMap.has(t))return s.EBADF;const i=this.openMap.get(t);return i instanceof I&&i.sync(),this.openMap.delete(t),s.SUCCESS}read(t,i){const n=this.openMap.get(t);return!n||n instanceof u?[s.EBADF]:[s.SUCCESS,n.read(i)]}pread(t,i,n){const r=this.openMap.get(t);return!r||r instanceof u?[s.EBADF]:[s.SUCCESS,r.pread(i,n)]}write(t,i){const n=this.openMap.get(t);return!n||n instanceof u?s.EBADF:(n.write(i),s.SUCCESS)}pwrite(t,i,n){const r=this.openMap.get(t);return!r||r instanceof u?s.EBADF:(r.pwrite(i,n),s.SUCCESS)}sync(t){const i=this.openMap.get(t);return!i||i instanceof u?s.EBADF:(i.sync(),s.SUCCESS)}seek(t,i,n){const r=this.openMap.get(t);return!r||r instanceof u?[s.EBADF]:[s.SUCCESS,r.seek(i,n)]}tell(t){const i=this.openMap.get(t);return!i||i instanceof u?[s.EBADF]:[s.SUCCESS,i.tell()]}renumber(t,i){return!this.exists(t)||!this.exists(i)?s.EBADF:(t===i||(this.close(i),this.openMap.set(i,this.openMap.get(t))),s.SUCCESS)}unlink(t,i){const n=this.openMap.get(t);if(!(n instanceof u))return s.EBADF;if(!n.contains(i))return s.ENOENT;for(const r of Object.keys(this.fs))(r===n.fullPath(i)||r.startsWith(`${n.fullPath(i)}/`))&&delete this.fs[r];return s.SUCCESS}rename(t,i,n,r){const a=this.openMap.get(t),f=this.openMap.get(n);if(!(a instanceof u)||!(f instanceof u))return s.EBADF;if(!a.contains(i))return s.ENOENT;if(f.contains(r))return s.EEXIST;const c=a.fullPath(i),o=f.fullPath(r);for(const E of Object.keys(this.fs))if(E.startsWith(c)){const h=E.replace(c,o);this.fs[h]=this.fs[E],this.fs[h].path=h,delete this.fs[E]}return s.SUCCESS}list(t){const i=this.openMap.get(t);return i instanceof u?[s.SUCCESS,i.list()]:[s.EBADF]}stat(t){const i=this.openMap.get(t);return i instanceof I?[s.SUCCESS,i.stat()]:[s.EBADF]}pathStat(t,i){const n=this.openMap.get(t);if(!(n instanceof u))return[s.EBADF];if(n.containsFile(i)){const r=n.fullPath(i),a=new I(this.fs[r],0).stat();return[s.SUCCESS,a]}else if(this.hasDir(n,i)){if(i===".")return[s.SUCCESS,new u(this.fs,"/").stat()];const r=`/${i}/`,a=Object.entries(this.fs).filter(([c])=>c.startsWith(r)),f=new u(Object.fromEntries(a),r).stat();return[s.SUCCESS,f]}else return[s.ENOTCAPABLE]}setFlags(t,i){const n=this.openMap.get(t);return n instanceof I?(n.setFlags(i),s.SUCCESS):s.EBADF}setSize(t,i){const n=this.openMap.get(t);return n instanceof I?(n.setSize(Number(i)),s.SUCCESS):s.EBADF}setAccessTime(t,i){const n=this.openMap.get(t);return n instanceof I?(n.setAccessTime(i),s.SUCCESS):s.EBADF}setModificationTime(t,i){const n=this.openMap.get(t);return n instanceof I?(n.setModificationTime(i),s.SUCCESS):s.EBADF}pathSetAccessTime(t,i,n){const r=this.openMap.get(t);if(!(r instanceof u))return s.EBADF;const a=r.get(i);if(!a)return s.ENOTCAPABLE;const f=new I(a,0);return f.setAccessTime(n),f.sync(),s.SUCCESS}pathSetModificationTime(t,i,n){const r=this.openMap.get(t);if(!(r instanceof u))return s.EBADF;const a=r.get(i);if(!a)return s.ENOTCAPABLE;const f=new I(a,0);return f.setModificationTime(n),f.sync(),s.SUCCESS}pathCreateDir(t,i){const n=this.openMap.get(t);if(!(n instanceof u))return s.EBADF;if(n.contains(i))return s.ENOTCAPABLE;const r=`${n.fullPath(i)}/.runno`;return this.fs[r]={path:r,timestamps:{access:new Date,modification:new Date,change:new Date},mode:"string",content:""},s.SUCCESS}exists(t){return this.openMap.has(t)}fileType(t){const i=this.openMap.get(t);return i?i instanceof I?D.REGULAR_FILE:D.DIRECTORY:D.UNKNOWN}fileFdflags(t){const i=this.openMap.get(t);return i instanceof I?i.fdflags:0}}class I{constructor(t,i){d(this,"file");d(this,"buffer");d(this,"_offset",BigInt(0));d(this,"isDirty",!1);d(this,"fdflags");d(this,"flagAppend");d(this,"flagDSync");d(this,"flagNonBlock");d(this,"flagRSync");d(this,"flagSync");if(this.file=t,this.file.mode==="string"){const n=new TextEncoder;this.buffer=n.encode(this.file.content)}else this.buffer=this.file.content;this.fdflags=i,this.flagAppend=!!(i&m.APPEND),this.flagDSync=!!(i&m.DSYNC),this.flagNonBlock=!!(i&m.NONBLOCK),this.flagRSync=!!(i&m.RSYNC),this.flagSync=!!(i&m.SYNC)}get offset(){return Number(this._offset)}read(t){const i=this.buffer.subarray(this.offset,this.offset+t);return this._offset+=BigInt(i.length),i}pread(t,i){return this.buffer.subarray(i,i+t)}write(t){if(this.isDirty=!0,this.flagAppend){const i=this.buffer.length;this.resize(i+t.byteLength),this.buffer.set(t,i)}else{const i=Math.max(this.offset+t.byteLength,this.buffer.byteLength);this.resize(i),this.buffer.set(t,this.offset),this._offset+=BigInt(t.byteLength)}(this.flagDSync||this.flagSync)&&this.sync()}pwrite(t,i){if(this.isDirty=!0,this.flagAppend){const n=this.buffer.length;this.resize(n+t.byteLength),this.buffer.set(t,n)}else{const n=Math.max(i+t.byteLength,this.buffer.byteLength);this.resize(n),this.buffer.set(t,i)}(this.flagDSync||this.flagSync)&&this.sync()}sync(){if(!this.isDirty)return;if(this.isDirty=!1,this.file.mode==="binary"){this.file.content=new Uint8Array(this.buffer);return}const t=new TextDecoder;this.file.content=t.decode(this.buffer)}seek(t,i){switch(i){case b.SET:this._offset=t;break;case b.CUR:this._offset+=t;break;case b.END:this._offset=BigInt(this.buffer.length)+t;break}return this._offset}tell(){return this._offset}stat(){return{path:this.file.path,timestamps:this.file.timestamps,type:D.REGULAR_FILE,byteLength:this.buffer.length}}setFlags(t){this.fdflags=t}setSize(t){this.resize(t)}setAccessTime(t){this.file.timestamps.access=t}setModificationTime(t){this.file.timestamps.modification=t}resize(t){if(t<=this.buffer.buffer.byteLength){this.buffer=new Uint8Array(this.buffer.buffer,0,t);return}let i;this.buffer.buffer.byteLength===0?i=new ArrayBuffer(t<1024?1024:t*2):t>this.buffer.buffer.byteLength*2?i=new ArrayBuffer(t*2):i=new ArrayBuffer(this.buffer.buffer.byteLength*2);const n=new Uint8Array(i,0,t);n.set(this.buffer),this.buffer=n}}function P(e,t){const i=t.replace(/[/\\-\\\\^$*+?.()|[\\]{}]/g,"\\\\$&"),n=new RegExp(`^${i}`);return e.replace(n,"")}class u{constructor(t,i){d(this,"dir");d(this,"prefix");this.dir=t,this.prefix=i}containsFile(t){for(const i of Object.keys(this.dir))if(P(i,this.prefix)===t)return!0;return!1}containsDirectory(t){for(const i of Object.keys(this.dir))if(P(i,this.prefix).startsWith(`${t}/`))return!0;return!1}contains(t){for(const i of Object.keys(this.dir)){const n=P(i,this.prefix);if(n===t||n.startsWith(`${t}/`))return!0}return!1}get(t){return this.dir[this.fullPath(t)]}fullPath(t){return`${this.prefix}${t}`}list(){const t=[],i=new Set;for(const n of Object.keys(this.dir)){const r=P(n,this.prefix);if(r.includes("/")){const a=r.split("/")[0];if(i.has(a))continue;i.add(a),t.push({name:a,type:D.DIRECTORY})}else t.push({name:r,type:D.REGULAR_FILE})}return t}stat(){return{path:this.prefix,timestamps:{access:new Date,modification:new Date,change:new Date},type:D.DIRECTORY,byteLength:0}}}let x=[];function y(e){x.push(e)}function rt(){const e=x;return x=[],e}class Y extends Error{}class Z extends Error{}class v{constructor(t){d(this,"instance");d(this,"module");d(this,"memory");d(this,"context");d(this,"drive");d(this,"hasBeenInitialized",!1);this.context=new X(t),this.drive=new nt(this.context.fs)}static async start(t,i={}){const n=new v(i),r=await WebAssembly.instantiateStreaming(t,n.getImportObject());return n.start(r)}static async initialize(t,i={}){const n=new v(i),r=await WebAssembly.instantiateStreaming(t,n.getImportObject());return n.initialize(r),r.instance.exports}getImportObject(){return{wasi_snapshot_preview1:this.getImports("preview1",this.context.debug),wasi_unstable:this.getImports("unstable",this.context.debug)}}start(t,i={}){if(this.hasBeenInitialized)throw new Z("This instance has already been initialized");if(this.hasBeenInitialized=!0,this.instance=t.instance,this.module=t.module,this.memory=i.memory??this.instance.exports.memory,"_initialize"in this.instance.exports)throw new Y("WebAssembly instance is a reactor and should be started with initialize.");if(!("_start"in this.instance.exports))throw new Y("WebAssembly instance doesn\'t export _start, it may not be WASI or may be a Reactor.");const n=this.instance.exports._start;try{n()}catch(r){if(r instanceof Q)return{exitCode:r.code,fs:this.drive.fs};if(r instanceof WebAssembly.RuntimeError)return{exitCode:134,fs:this.drive.fs};throw r}return{exitCode:0,fs:this.drive.fs}}initialize(t,i={}){if(this.hasBeenInitialized)throw new Z("This instance has already been initialized");if(this.hasBeenInitialized=!0,this.instance=t.instance,this.module=t.module,this.memory=i.memory??this.instance.exports.memory,"_start"in this.instance.exports)throw new Y("WebAssembly instance is a command and should be started with start.");if("_initialize"in this.instance.exports){const n=this.instance.exports._initialize;n()}}getImports(t,i){const n={args_get:this.args_get.bind(this),args_sizes_get:this.args_sizes_get.bind(this),clock_res_get:this.clock_res_get.bind(this),clock_time_get:this.clock_time_get.bind(this),environ_get:this.environ_get.bind(this),environ_sizes_get:this.environ_sizes_get.bind(this),proc_exit:this.proc_exit.bind(this),random_get:this.random_get.bind(this),sched_yield:this.sched_yield.bind(this),fd_advise:this.fd_advise.bind(this),fd_allocate:this.fd_allocate.bind(this),fd_close:this.fd_close.bind(this),fd_datasync:this.fd_datasync.bind(this),fd_fdstat_get:this.fd_fdstat_get.bind(this),fd_fdstat_set_flags:this.fd_fdstat_set_flags.bind(this),fd_fdstat_set_rights:this.fd_fdstat_set_rights.bind(this),fd_filestat_get:this.fd_filestat_get.bind(this),fd_filestat_set_size:this.fd_filestat_set_size.bind(this),fd_filestat_set_times:this.fd_filestat_set_times.bind(this),fd_pread:this.fd_pread.bind(this),fd_prestat_dir_name:this.fd_prestat_dir_name.bind(this),fd_prestat_get:this.fd_prestat_get.bind(this),fd_pwrite:this.fd_pwrite.bind(this),fd_read:this.fd_read.bind(this),fd_readdir:this.fd_readdir.bind(this),fd_renumber:this.fd_renumber.bind(this),fd_seek:this.fd_seek.bind(this),fd_sync:this.fd_sync.bind(this),fd_tell:this.fd_tell.bind(this),fd_write:this.fd_write.bind(this),path_filestat_get:this.path_filestat_get.bind(this),path_filestat_set_times:this.path_filestat_set_times.bind(this),path_open:this.path_open.bind(this),path_rename:this.path_rename.bind(this),path_unlink_file:this.path_unlink_file.bind(this),path_create_directory:this.path_create_directory.bind(this),path_link:this.path_link.bind(this),path_readlink:this.path_readlink.bind(this),path_remove_directory:this.path_remove_directory.bind(this),path_symlink:this.path_symlink.bind(this),poll_oneoff:this.poll_oneoff.bind(this),proc_raise:this.proc_raise.bind(this),sock_accept:this.sock_accept.bind(this),sock_recv:this.sock_recv.bind(this),sock_send:this.sock_send.bind(this),sock_shutdown:this.sock_shutdown.bind(this),sock_open:this.sock_open.bind(this),sock_listen:this.sock_listen.bind(this),sock_connect:this.sock_connect.bind(this),sock_setsockopt:this.sock_setsockopt.bind(this),sock_bind:this.sock_bind.bind(this),sock_getlocaladdr:this.sock_getlocaladdr.bind(this),sock_getpeeraddr:this.sock_getpeeraddr.bind(this),sock_getaddrinfo:this.sock_getaddrinfo.bind(this)};t==="unstable"&&(n.path_filestat_get=this.unstable_path_filestat_get.bind(this),n.fd_filestat_get=this.unstable_fd_filestat_get.bind(this),n.fd_seek=this.unstable_fd_seek.bind(this));for(const[r,a]of Object.entries(n))n[r]=function(){let f=a.apply(this,arguments);if(i){const c=rt();f=i(r,[...arguments],f,c)??f}return f};return n}get envArray(){return Object.entries(this.context.env).map(([t,i])=>`${t}=${i}`)}args_get(t,i){const n=new DataView(this.memory.buffer);for(const r of this.context.args){n.setUint32(t,i,!0),t+=4;const a=new TextEncoder().encode(`${r}\\0`);new Uint8Array(this.memory.buffer,i,a.byteLength).set(a),i+=a.byteLength}return s.SUCCESS}args_sizes_get(t,i){const n=this.context.args,r=n.reduce((f,c)=>f+new TextEncoder().encode(`${c}\\0`).byteLength,0),a=new DataView(this.memory.buffer);return a.setUint32(t,n.length,!0),a.setUint32(i,r,!0),s.SUCCESS}clock_res_get(t,i){switch(t){case C.REALTIME:case C.MONOTONIC:case C.PROCESS_CPUTIME_ID:case C.THREAD_CPUTIME_ID:return new DataView(this.memory.buffer).setBigUint64(i,BigInt(1e6),!0),s.SUCCESS}return s.EINVAL}clock_time_get(t,i,n){switch(t){case C.REALTIME:case C.MONOTONIC:case C.PROCESS_CPUTIME_ID:case C.THREAD_CPUTIME_ID:return new DataView(this.memory.buffer).setBigUint64(n,w(new Date),!0),s.SUCCESS}return s.EINVAL}environ_get(t,i){const n=new DataView(this.memory.buffer);for(const r of this.envArray){n.setUint32(t,i,!0),t+=4;const a=new TextEncoder().encode(`${r}\\0`);new Uint8Array(this.memory.buffer,i,a.byteLength).set(a),i+=a.byteLength}return s.SUCCESS}environ_sizes_get(t,i){const n=this.envArray.reduce((a,f)=>a+new TextEncoder().encode(`${f}\\0`).byteLength,0),r=new DataView(this.memory.buffer);return r.setUint32(t,this.envArray.length,!0),r.setUint32(i,n,!0),s.SUCCESS}proc_exit(t){throw new Q(t)}random_get(t,i){const n=new Uint8Array(this.memory.buffer,t,i);return globalThis.crypto.getRandomValues(n),s.SUCCESS}sched_yield(){return s.SUCCESS}fd_read(t,i,n,r){if(t===1||t===2)return s.ENOTSUP;const a=new DataView(this.memory.buffer),f=k(a,i,n),c=new TextEncoder;let o=0,E=s.SUCCESS;for(const h of f){let S;if(t===0){const T=this.context.stdin(h.byteLength);if(!T)break;S=c.encode(T)}else{const[T,p]=this.drive.read(t,h.byteLength);if(T){E=T;break}else S=p}const g=Math.min(h.byteLength,S.byteLength);h.set(S.subarray(0,g)),o+=g}return y({bytesRead:o}),a.setUint32(r,o,!0),E}fd_write(t,i,n,r){if(t===0)return s.ENOTSUP;const a=new DataView(this.memory.buffer),f=k(a,i,n),c=new TextDecoder;let o=0,E=s.SUCCESS;for(const h of f)if(h.byteLength!==0){if(t===1||t===2){const S=t===1?this.context.stdout:this.context.stderr,g=c.decode(h);S(g),y({output:g})}else if(E=this.drive.write(t,h),E!=s.SUCCESS)break;o+=h.byteLength}return a.setUint32(r,o,!0),E}fd_advise(){return s.SUCCESS}fd_allocate(t,i,n){return this.drive.pwrite(t,new Uint8Array(Number(n)),Number(i))}fd_close(t){return this.drive.close(t)}fd_datasync(t){return this.drive.sync(t)}fd_fdstat_get(t,i){if(t<3){let c;if(this.context.isTTY){const E=V^_.FD_SEEK^_.FD_TELL;c=H(D.CHARACTER_DEVICE,0,E)}else c=H(D.CHARACTER_DEVICE,0);return new Uint8Array(this.memory.buffer,i,c.byteLength).set(c),s.SUCCESS}if(!this.drive.exists(t))return s.EBADF;const n=this.drive.fileType(t),r=this.drive.fileFdflags(t),a=H(n,r);return new Uint8Array(this.memory.buffer,i,a.byteLength).set(a),s.SUCCESS}fd_fdstat_set_flags(t,i){return this.drive.setFlags(t,i)}fd_fdstat_set_rights(){return s.SUCCESS}fd_filestat_get(t,i){return this.shared_fd_filestat_get(t,i,"preview1")}unstable_fd_filestat_get(t,i){return this.shared_fd_filestat_get(t,i,"unstable")}shared_fd_filestat_get(t,i,n){const r=n==="unstable"?q:J;if(t<3){let E;switch(t){case 0:E="/dev/stdin";break;case 1:E="/dev/stdout";break;case 2:E="/dev/stderr";break;default:E="/dev/undefined";break}const h=r({path:E,byteLength:0,timestamps:{access:new Date,modification:new Date,change:new Date},type:D.CHARACTER_DEVICE});return new Uint8Array(this.memory.buffer,i,h.byteLength).set(h),s.SUCCESS}const[a,f]=this.drive.stat(t);if(a!=s.SUCCESS)return a;y({resolvedPath:f.path,stat:f});const c=r(f);return new Uint8Array(this.memory.buffer,i,c.byteLength).set(c),s.SUCCESS}fd_filestat_set_size(t,i){return this.drive.setSize(t,i)}fd_filestat_set_times(t,i,n,r){let a=null;r&N.ATIM&&(a=l(i)),r&N.ATIM_NOW&&(a=new Date);let f=null;if(r&N.MTIM&&(f=l(n)),r&N.MTIM_NOW&&(f=new Date),a){const c=this.drive.setAccessTime(t,a);if(c!=s.SUCCESS)return c}if(f){const c=this.drive.setModificationTime(t,f);if(c!=s.SUCCESS)return c}return s.SUCCESS}fd_pread(t,i,n,r,a){if(t===1||t===2)return s.ENOTSUP;if(t===0)return this.fd_read(t,i,n,a);const f=new DataView(this.memory.buffer),c=k(f,i,n);let o=0,E=s.SUCCESS;for(const h of c){const[S,g]=this.drive.pread(t,h.byteLength,Number(r)+o);if(S!==s.SUCCESS){E=S;break}const T=Math.min(h.byteLength,g.byteLength);h.set(g.subarray(0,T)),o+=T}return f.setUint32(a,o,!0),E}fd_prestat_dir_name(t,i,n){if(t!==3)return s.EBADF;const r=new TextEncoder().encode("/");return new Uint8Array(this.memory.buffer,i,n).set(r.subarray(0,n)),s.SUCCESS}fd_prestat_get(t,i){if(t!==3)return s.EBADF;const n=new TextEncoder().encode("."),r=new DataView(this.memory.buffer,i);return r.setUint8(0,G.DIR),r.setUint32(4,n.byteLength,!0),s.SUCCESS}fd_pwrite(t,i,n,r,a){if(t===0)return s.ENOTSUP;if(t===1||t===2)return this.fd_write(t,i,n,a);const f=new DataView(this.memory.buffer),c=k(f,i,n);let o=0,E=s.SUCCESS;for(const h of c)if(h.byteLength!==0){if(E=this.drive.pwrite(t,h,Number(r)),E!=s.SUCCESS)break;o+=h.byteLength}return f.setUint32(a,o,!0),E}fd_readdir(t,i,n,r,a){const[f,c]=this.drive.list(t);if(f!=s.SUCCESS)return f;let o=[],E=0;for(const{name:U,type:F}of c){const K=at(U,F,E);o.push(K),E++}o=o.slice(Number(r));const h=o.reduce((U,F)=>U+F.byteLength,0),S=new Uint8Array(h);let g=0;for(const U of o)S.set(U,g),g+=U.byteLength;const T=new Uint8Array(this.memory.buffer,i,n),p=S.subarray(0,n);return T.set(p),new DataView(this.memory.buffer).setUint32(a,p.byteLength,!0),s.SUCCESS}fd_renumber(t,i){return this.drive.renumber(t,i)}fd_seek(t,i,n,r){const[a,f]=this.drive.seek(t,i,n);return a!==s.SUCCESS||(y({newOffset:f.toString()}),new DataView(this.memory.buffer).setBigUint64(r,f,!0)),a}unstable_fd_seek(t,i,n,r){const a=ot[n];return this.fd_seek(t,i,a,r)}fd_sync(t){return this.drive.sync(t)}fd_tell(t,i){const[n,r]=this.drive.tell(t);return n!==s.SUCCESS||new DataView(this.memory.buffer).setBigUint64(i,r,!0),n}path_filestat_get(t,i,n,r,a){return this.shared_path_filestat_get(t,i,n,r,a,"preview1")}unstable_path_filestat_get(t,i,n,r,a){return this.shared_path_filestat_get(t,i,n,r,a,"unstable")}shared_path_filestat_get(t,i,n,r,a,f){const c=f==="unstable"?q:J,o=new TextDecoder().decode(new Uint8Array(this.memory.buffer,n,r));y({path:o});const[E,h]=this.drive.pathStat(t,o);if(E!=s.SUCCESS)return E;const S=c(h);return new Uint8Array(this.memory.buffer,a,S.byteLength).set(S),E}path_filestat_set_times(t,i,n,r,a,f,c){let o=null;c&N.ATIM&&(o=l(a)),c&N.ATIM_NOW&&(o=new Date);let E=null;c&N.MTIM&&(E=l(f)),c&N.MTIM_NOW&&(E=new Date);const h=new TextDecoder().decode(new Uint8Array(this.memory.buffer,n,r));if(o){const S=this.drive.pathSetAccessTime(t,h,o);if(S!=s.SUCCESS)return S}if(E){const S=this.drive.pathSetModificationTime(t,h,E);if(S!=s.SUCCESS)return S}return s.SUCCESS}path_open(t,i,n,r,a,f,c,o,E){const h=new DataView(this.memory.buffer),S=B(this.memory,n,r),g=!!(a&O.CREAT),T=!!(a&O.DIRECTORY),p=!!(a&O.EXCL),et=!!(a&O.TRUNC),U=!!(o&m.APPEND),F=!!(o&m.DSYNC),K=!!(o&m.NONBLOCK),dt=!!(o&m.RSYNC),ut=!!(o&m.SYNC);y({path:S,openFlags:{createFileIfNone:g,failIfNotDir:T,failIfFileExists:p,truncateFile:et},fileDescriptorFlags:{flagAppend:U,flagDSync:F,flagNonBlock:K,flagRSync:dt,flagSync:ut}});const[z,gt]=this.drive.open(t,S,a,o);return z||(h.setUint32(E,gt,!0),z)}path_rename(t,i,n,r,a,f){const c=B(this.memory,i,n),o=B(this.memory,a,f);return y({oldPath:c,newPath:o}),this.drive.rename(t,c,r,o)}path_unlink_file(t,i,n){const r=B(this.memory,i,n);return y({path:r}),this.drive.unlink(t,r)}poll_oneoff(t,i,n,r){for(let f=0;f<n;f++){const c=new Uint8Array(this.memory.buffer,t+f*$,$),o=st(c),E=new Uint8Array(this.memory.buffer,i+f*j,j);let h=0,S=s.SUCCESS;switch(o.type){case A.CLOCK:for(;new Date<o.timeout;);E.set(ft(o.userdata,s.SUCCESS));break;case A.FD_READ:if(o.fd<3)o.fd===0?(S=s.SUCCESS,h=32):S=s.EBADF;else{const[g,T]=this.drive.stat(o.fd);S=g,h=T?T.byteLength:0}E.set(tt(o.userdata,S,A.FD_READ,BigInt(h)));break;case A.FD_WRITE:if(h=0,S=s.SUCCESS,o.fd<3)o.fd===0?S=s.EBADF:(S=s.SUCCESS,h=1024);else{const[g,T]=this.drive.stat(o.fd);S=g,h=T?T.byteLength:0}E.set(tt(o.userdata,S,A.FD_READ,BigInt(h)));break}}return new DataView(this.memory.buffer,r,4).setUint32(0,n,!0),s.SUCCESS}path_create_directory(t,i,n){const r=B(this.memory,i,n);return this.drive.pathCreateDir(t,r)}path_link(){return s.ENOSYS}path_readlink(){return s.ENOSYS}path_remove_directory(){return s.ENOSYS}path_symlink(){return s.ENOSYS}proc_raise(){return s.ENOSYS}sock_accept(){return s.ENOSYS}sock_recv(){return s.ENOSYS}sock_send(){return s.ENOSYS}sock_shutdown(){return s.ENOSYS}sock_open(){return s.ENOSYS}sock_listen(){return s.ENOSYS}sock_connect(){return s.ENOSYS}sock_setsockopt(){return s.ENOSYS}sock_bind(){return s.ENOSYS}sock_getlocaladdr(){return s.ENOSYS}sock_getpeeraddr(){return s.ENOSYS}sock_getaddrinfo(){return s.ENOSYS}}const V=_.FD_DATASYNC|_.FD_READ|_.FD_SEEK|_.FD_FDSTAT_SET_FLAGS|_.FD_SYNC|_.FD_TELL|_.FD_WRITE|_.FD_ADVISE|_.FD_ALLOCATE|_.PATH_CREATE_DIRECTORY|_.PATH_CREATE_FILE|_.PATH_LINK_SOURCE|_.PATH_LINK_TARGET|_.PATH_OPEN|_.FD_READDIR|_.PATH_READLINK|_.PATH_RENAME_SOURCE|_.PATH_RENAME_TARGET|_.PATH_FILESTAT_GET|_.PATH_FILESTAT_SET_SIZE|_.PATH_FILESTAT_SET_TIMES|_.FD_FILESTAT_GET|_.FD_FILESTAT_SET_SIZE|_.FD_FILESTAT_SET_TIMES|_.PATH_SYMLINK|_.PATH_REMOVE_DIRECTORY|_.PATH_UNLINK_FILE|_.POLL_FD_READWRITE|_.SOCK_SHUTDOWN|_.SOCK_ACCEPT;class Q extends Error{constructor(i){super();d(this,"code");this.code=i}}function B(e,t,i){return new TextDecoder().decode(new Uint8Array(e.buffer,t,i))}function k(e,t,i){let n=Array(i);for(let r=0;r<i;r++){const a=e.getUint32(t,!0);t+=4;const f=e.getUint32(t,!0);t+=4,n[r]=new Uint8Array(e.buffer,a,f)}return n}function st(e){const t=new Uint8Array(8);t.set(e.subarray(0,8));const i=e[8],n=new DataView(e.buffer,e.byteOffset+9);switch(i){case A.FD_READ:case A.FD_WRITE:return{userdata:t,type:i,fd:n.getUint32(0,!0)};case A.CLOCK:const r=n.getUint16(24,!0),a=w(new Date),f=n.getBigUint64(8,!0),c=n.getBigUint64(16,!0),o=r&it.SUBSCRIPTION_CLOCK_ABSTIME?f:a+f;return{userdata:t,type:i,id:n.getUint32(0,!0),timeout:l(o),precision:l(o+c)}}}function J(e){const t=new Uint8Array(W),i=new DataView(t.buffer);return i.setBigUint64(0,BigInt(0),!0),i.setBigUint64(8,BigInt(R(e.path)),!0),i.setUint8(16,e.type),i.setBigUint64(24,BigInt(1),!0),i.setBigUint64(32,BigInt(e.byteLength),!0),i.setBigUint64(40,w(e.timestamps.access),!0),i.setBigUint64(48,w(e.timestamps.modification),!0),i.setBigUint64(56,w(e.timestamps.change),!0),t}function q(e){const t=new Uint8Array(W),i=new DataView(t.buffer);return i.setBigUint64(0,BigInt(0),!0),i.setBigUint64(8,BigInt(R(e.path)),!0),i.setUint8(16,e.type),i.setUint32(20,1,!0),i.setBigUint64(24,BigInt(e.byteLength),!0),i.setBigUint64(32,w(e.timestamps.access),!0),i.setBigUint64(40,w(e.timestamps.modification),!0),i.setBigUint64(48,w(e.timestamps.change),!0),t}function H(e,t,i){const n=i??V,r=i??V,a=new Uint8Array(24),f=new DataView(a.buffer,0,24);return f.setUint8(0,e),f.setUint32(2,t,!0),f.setBigUint64(8,n,!0),f.setBigUint64(16,r,!0),a}function at(e,t,i){const n=new TextEncoder().encode(e),r=24+n.byteLength,a=new Uint8Array(r),f=new DataView(a.buffer);return f.setBigUint64(0,BigInt(i+1),!0),f.setBigUint64(8,BigInt(R(e)),!0),f.setUint32(16,n.length,!0),f.setUint8(20,t),a.set(n,24),a}function ft(e,t){const i=new Uint8Array(32);i.set(e,0);const n=new DataView(i.buffer);return n.setUint16(8,t,!0),n.setUint16(10,A.CLOCK,!0),i}function tt(e,t,i,n){const r=new Uint8Array(32);r.set(e,0);const a=new DataView(r.buffer);return a.setUint16(8,t,!0),a.setUint16(10,i,!0),a.setBigUint64(16,n,!0),r}function R(e,t=0){let i=3735928559^t,n=1103547991^t;for(let r=0,a;r<e.length;r++)a=e.charCodeAt(r),i=Math.imul(i^a,2654435761),n=Math.imul(n^a,1597334677);return i=Math.imul(i^i>>>16,2246822507)^Math.imul(n^n>>>13,3266489909),n=Math.imul(n^n>>>16,2246822507)^Math.imul(i^i>>>13,3266489909),4294967296*(2097151&n)+(i>>>0)}function w(e){return BigInt(e.getTime())*BigInt(1e6)}function l(e){return new Date(Number(e/BigInt(1e6)))}const ot={[M.CUR]:b.CUR,[M.END]:b.END,[M.SET]:b.SET};onmessage=async e=>{const t=e.data;switch(t.type){case"start":try{const i=await ct(t.binaryURL,t.stdinBuffer,t);L({target:"host",type:"result",result:i})}catch(i){let n;i instanceof Error?n={message:i.message,type:i.constructor.name}:n={message:`unknown error - ${i}`,type:"Unknown"},L({target:"host",type:"crash",error:n})}break}};function L(e){postMessage(e)}async function ct(e,t,i){return v.start(fetch(e),new X({...i,stdout:Et,stderr:ht,stdin:n=>_t(n,t),debug:St}))}function Et(e){L({target:"host",type:"stdout",text:e})}function ht(e){L({target:"host",type:"stderr",text:e})}function St(e,t,i,n){return n=JSON.parse(JSON.stringify(n)),L({target:"host",type:"debug",name:e,args:t,ret:i,data:n}),i}function _t(e,t){Atomics.wait(new Int32Array(t),0,0);const i=new DataView(t),n=i.getInt32(0);if(n<0)return i.setInt32(0,0),null;const r=new Uint8Array(t,4,n),a=new TextDecoder().decode(r.slice(0,e)),f=r.slice(e,r.length);return i.setInt32(0,f.byteLength),r.set(f),a}})();\n', tt = typeof self < "u" && self.Blob && new Blob([it], { type: "text/javascript;charset=utf-8" });
function Tt(i) {
  let t;
  try {
    if (t = tt && (self.URL || self.webkitURL).createObjectURL(tt), !t) throw "";
    const e = new Worker(t, {
      name: i == null ? void 0 : i.name
    });
    return e.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), e;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(it),
      {
        name: i == null ? void 0 : i.name
      }
    );
  } finally {
    t && (self.URL || self.webkitURL).revokeObjectURL(t);
  }
}
function Ct(i, t) {
  i.postMessage(t);
}
class bt extends Error {
}
class At {
  constructor(t, e) {
    _(this, "binaryURL");
    // 8kb should be big enough
    _(this, "stdinBuffer", new SharedArrayBuffer(8 * 1024));
    _(this, "context");
    _(this, "result");
    _(this, "worker");
    _(this, "reject");
    this.binaryURL = t, this.context = e;
  }
  async start() {
    if (this.result)
      throw new Error("WASIWorker Host can only be started once");
    return this.result = new Promise((t, e) => {
      this.reject = e, this.worker = new Tt(), this.worker.addEventListener("message", (n) => {
        var a, o, h, f, c, E;
        const s = n.data;
        switch (s.type) {
          case "stdout":
            (o = (a = this.context).stdout) == null || o.call(a, s.text);
            break;
          case "stderr":
            (f = (h = this.context).stderr) == null || f.call(h, s.text);
            break;
          case "debug":
            (E = (c = this.context).debug) == null || E.call(c, s.name, s.args, s.ret, s.data);
            break;
          case "result":
            t(s.result);
            break;
          case "crash":
            e(s.error);
            break;
        }
      }), Ct(this.worker, {
        target: "client",
        type: "start",
        binaryURL: this.binaryURL,
        stdinBuffer: this.stdinBuffer,
        // Unfortunately can't just splat these because it includes types
        // that can't be sent as a message.
        args: this.context.args,
        env: this.context.env,
        fs: this.context.fs,
        isTTY: this.context.isTTY
      });
    }).then((t) => {
      var e;
      return (e = this.worker) == null || e.terminate(), t;
    }), this.result;
  }
  kill() {
    var t;
    if (!this.worker)
      throw new Error("WASIWorker has not started");
    this.worker.terminate(), (t = this.reject) == null || t.call(this, new bt("WASI Worker was killed"));
  }
  async pushStdin(t) {
    const e = new DataView(this.stdinBuffer);
    for (; e.getInt32(0) !== 0; )
      await new Promise((a) => setTimeout(a, 0));
    const n = new TextEncoder().encode(t);
    new Uint8Array(this.stdinBuffer, 4).set(n), e.setInt32(0, n.byteLength), Atomics.notify(new Int32Array(this.stdinBuffer), 0);
  }
  async pushEOF() {
    const t = new DataView(this.stdinBuffer);
    for (; t.getInt32(0) !== 0; )
      await new Promise((e) => setTimeout(e, 0));
    t.setInt32(0, -1), Atomics.notify(new Int32Array(this.stdinBuffer), 0);
  }
}
export {
  X as InitializationError,
  x as InvalidInstanceError,
  W as WASI,
  ct as WASIContext,
  It as WASISnapshotPreview1,
  At as WASIWorkerHost,
  bt as WASIWorkerHostKilledError
};
