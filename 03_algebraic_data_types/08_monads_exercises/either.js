const util = require('util');

class Either {
    static of(x) {
        return new Right(x);
    }

    constructor(x) {
        this.$value = x;
    }
}

class Right extends Either {
    get isLeft() {
        return false;
    }

    get isRight() {
        return true;
    }

    static of(x) {
        throw new Error('`of` called on class Right (value) instead of Either (type)');
    }

    inspect() {
        return `Right(${util.inspect(this.$value)})`;
    }
    
    // ----- Functor (Either a)
    map(fn) {
        return Either.of(fn(this.$value));
    }

    // ----- Applicative (Either a)
    ap(f) {
        return f.map(this.$value);
    }

    // ----- Monad (Either a)
    chain(fn) {
        return fn(this.$value);
    }

    join() {
        return this.$value;
    }

    // ----- Traversable (Either a)
    sequence(of) {
        return this.traverse(of, identity);
    }

    traverse(of, fn) {
        fn(this.$value).map(Either.of);
    }
}

class Left extends Either {
    map(f) {
        return this;
    }

    inspect() {
        return `Left(${util.inspect(this.$value)})`;
    }
}


module.exports.Either = Either;
module.exports.Right = Right;
module.exports.Left = Left;