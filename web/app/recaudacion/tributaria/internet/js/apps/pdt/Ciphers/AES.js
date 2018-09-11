/**
*  Implementation of the AES Chipher in js, using Typed arrays 
*  	
*  @param Object	Setup object for the cipher, containing field keyLength (128,192,256)
*  
*  @package CapyCrypta
*  @author  Jannis Mosshammer <mojadev@gmail.com>
**/
window.CapyCrypta.AES = function(cfg) {
    var AES = window.CapyCrypta.AES;
    var DEBUGMODE = true;
    /**
     * Debug output
     * @params varargs	The debug output given to console.log 
     * @returns
     */
    var debug = function() {
         if(!DEBUGMODE)
            return;
        var log = ['[AES DEBUG ]'];
        log.push(arguments);
        console.log.apply(console,log);
    };
    
    /**
     * Sets up keyLength depenend variables for this cipher 
     * 
     * @param Object 	See object constructor, only keyLength is required here
     */
    var construct = function(cfg) {
		this.keySize = parseInt(cfg["keyLength"],10);
        this.Nk = parseInt(this.keySize/32,10);
        this.Nb = 4;
        this.rounds = {
            4: 10,
            6: 12,
            8: 14
        }[this.Nk];
        var roundKeyBuffer = this.Nb*(this.rounds+1);    
        this.roundKeys = new Uint32Array(roundKeyBuffer);
    };
    
    /**
     * Sets up the cipher to use the provided key 
     * @param String	The key to use
     */
    this.setKey = function(key) {
        expandKey.call(this,key);
    };

 
    /**
     * The AES expandKey function, sets up the roundKeys in this.roundKeys
     * 
     * @param String	The key to for expansion
     */
    var expandKey = function(rawkey) {
        var temp = 0x00;
        var keyBuffer = new ArrayBuffer(4*this.Nk); 
        
        var keyByte = new Uint32Array(keyBuffer); 
        var key = new Uint8Array(keyBuffer);
        if(typeof rawkey == "string") { 
            for(var x=0;x<rawkey.length;x++)
                key[x] = rawkey.charCodeAt(x);
        } else {
            for(var y=0;y<rawkey.length;y++)
                key[y] = parseInt(rawkey[y],10);
        }
        
        var i=0;
        while(i<this.Nk){
            this.roundKeys[i] = keyByte[i];
            i++;
        }
        i = this.Nk;
        while(i<this.Nb*(this.rounds+1)) {
            temp = this.roundKeys[i-1];
//            debug("temp i:"+i,temp.toString(16));
            if(i % this.Nk === 0) {
                temp = rotWord(temp); 
//                debug("rotWord i:"+i,temp.toString(16));
                temp = subWord(temp);
//                debug("tsubWord i:"+i,temp.toString(16));
                temp ^= AES.Rcon[i/this.Nk];
//                debug("AES.Rcon i:"+i,temp.toString(16));
            } 
            if (this.Nk > 6 && (i % this.Nk === 4))
                temp = subWord(temp);

            this.roundKeys[i] = this.roundKeys[i-this.Nk];
//            debug("temp i-Nk:"+i,temp.toString(16));
            this.roundKeys[i] ^= temp; 
//            debug("temp xor:"+i,temp.toString(16));
            i++;
        }

    };
    
    /**
     * The AES rotate word function
     * @param Integer	The word to rotate
     * @returns Integer	The rotated binary word
     */
    var rotWord = function(word) {
        var v = word & 0xff;
        word = (word >> 8);       
        word = word & 0x00ffffff;
        
        word |= (v << 24);
        return word;
    };
    
    /**
     * Applies the AES SBox on target
     * @param Integer	The word to substitude
     * @returns Integer
     */
    var subWord = function(target) {
        var result = 0;    
        result |= AES.SBox[target & 0xff];
        result |= AES.SBox[(target >> 8)  & 0xff]<<8;
        result |= AES.SBox[(target >> 16) & 0xff]<<16;
        result |= AES.SBox[(target >> 24) & 0xff]<<24;
        return result;
    };

    /**
     * Creates a column-major array from the internal used row-major array
     * @param Uint8Array	row-major array
     * @returns Uint8Array	column-major array
     */
    var toBlock = function(state) {    
        var block = new Uint8Array(this.Nb*this.Nb);
        var p = 0;
        for(var x=0;x<this.Nb;x++) {
            for(var y=0;y<this.Nb;y++) {
                block[p++] = state.at(y,x);
            }
        }
        return block;
    };
    
    /**
     * Creates a state array from an input block
     * 
     * @param Uint8Array The input block
     * @returns Uint8Array The state
     */
    var getState = function(block) {
        var state = {
        	d: new Uint8Array(this.Nb*this.Nb)
        };
        var __Nb = this.Nb;
        // state getter and setter
        /**
         * Sets an entry at x,y 
         * @param Integer 	The x-position of the state
         * @param Integer	The y-position of the state
         * @param Integer	The value in the state
         */
        state.set = function(x,y,v) {
            state.d[y+x*__Nb] = v;     
        };
        /**
         * returns the entry at x,y 
         * @param Integer 	The x-position of the state
         * @param Integer	The y-position of the state
         * @return Integer
         */
        state.at = function(x,y) {
            return state.d[y+x*__Nb];    
        };
        /**
         * Debug function that logs the hex values of the state to the console
         * @param String the String to use for debugging
         */
        state.log = function(t) {
            if(DEBUGVEC)
                console.log(t,state.toHex());
        };
        /**
         * Debug function that returns the space-separated hex values 
         * of this state
         * @returns String
         */
        state.toHex = function() {
            var t = "";
            for(var x=0;x<__Nb;x++) {
                for(var y=0;y<__Nb;y++)
                    t += state.d.at(y,x).toString(16)+" ";
            }
        
            return t;
        };
        var p=0;
        if(typeof block == "string") {
            for(var x=0;x<this.Nb;x++) {
                for(var y=0;y<this.Nb;y++) {
                    state.set(y,x,block.charCodeAt(p++));
                }
            }
        } else {
            for(var x=0;x<this.Nb;x++) {
                for(var y=0;y<this.Nb;y++) {
                    state.set(y,x,block[p++]);
                }
            }
        }
        return state;
    };
    
    /**
     * The AES subBytes function
     * @param Uint8Array	The state to substitute
     */
    var subBytes = function(state) {
        for(var i=0;i<state.d.length;i++)
            state.d[i] = AES.SBox[state.d[i]];    
    };
    
    /**
     * The inverse AES subBytes function
     * @param Uint8Array	The state to substitute
     */
    var invSubBytes = function(state) {
        for(var i=0;i<state.d.length;i++)
            state.d[i] = AES.SBox_inv[state.d[i]];    
    };
    
    /**
     * The AES shiftRows function
     * @param Uint8Array	The state to apply the shift on
     */
    var shiftRows = function(state) {
        var l = this.Nb;    

        for(var y=1;y<this.Nb;y++) {    
            var start = y*l;
            var t = [];
        
            var trunc = [];
            for(var i=0;i<y;i++) 
                trunc[i] = state.d[start++];
            while(start<(y+1)*l) {
                state.d[start-y]=state.d[start++];
            }
            for(var i=y;i>0;i--) {
                state.d[start-i] = trunc.shift();
            }
        }
    };
    
    /**
     * The inverse AES shiftRows function
     * @param Uint8Array	The state to remove the shift from
     */
    var invShiftRows = function(state) {
        var l = this.Nb;    

        for(var y=1;y<this.Nb;y++) {    
            var end = (y+1)*l-1;
            var t = [];
        
            var trunc = [];
            for(var i=0;i<y;i++) 
                trunc[i] = state.d[end--];
            while(end>=(y*l)) {
                state.d[end+y]=state.d[end--];
            }
            for(var i=y;i>0;i--) {
                state.d[end+i] = trunc.shift();
            }
        }
    };
    
    /**
     * The AES mixColumns function
     * @param Uint8Array	The state to apply the mixColumns on
     */
    var mixColumns = function(state) {
        for(var x=0;x<this.Nb;x++) {
            var s0 = state.at(0,x);
            var s1 = state.at(1,x);
            var s2 = state.at(2,x);
            var s3 = state.at(3,x);
            state.set(0,x,(AES.G2[s0])^(AES.G3[s1])^s2^s3);
            state.set(1,x,s0^(AES.G2[s1])^(AES.G3[s2])^s3);
            state.set(2,x,s0^s1^(AES.G2[s2])^(AES.G3[s3]));
            state.set(3,x,(AES.G3[s0])^s1^s2^(AES.G2[s3]));
        }
    };
    /**
     * The inverse AES mixColumns function
     * @param Uint8Array	The state to apply the inverse mixColumns on
     */
    var invMixColumns = function(state) {

        for(var x=0;x<this.Nb;x++) {
            var s0 = state.at(0,x);
            var s1 = state.at(1,x);
            var s2 = state.at(2,x);
            var s3 = state.at(3,x);
            state.set(0,x,(AES.G14[s0])^(AES.G11[s1])^(AES.G13[s2])^(AES.G9[s3]));
            state.set(1,x,(AES.G9[s0])^(AES.G14[s1])^(AES.G11[s2])^(AES.G13[s3]));
            state.set(2,x,(AES.G13[s0])^(AES.G9[s1])^(AES.G14[s2])^(AES.G11[s3]));
            state.set(3,x,(AES.G11[s0])^(AES.G13[s1])^(AES.G9[s2])^(AES.G14[s3]));
        }
    };

    /**
     * The AES addRoundKey function
     * @param Uint8Array	The state to apply the addRoundKey on
     * @param Integer		The current round
     */
    var addRoundKey = function(state, pos) {
    
        for(var x=0;x<this.Nb;x++) {
            var key = this.roundKeys[pos+x];
//            debug("RoundKey /col "+x,key.toString(16));    
            for(var y=0;y<this.Nb;y++) {
                state.set(y,x,state.at(y,x)^(key>>y*8)&0xff);
            }    
        }
    };    

    /**
     * Encrypts a block using the key from setKey and the keyLength given on construction
	 *
     * @param Uint8Array	The block to Encrypt
     * @returns Uint8Array	The encrypted block
     */
    var cipher = function(block) {
        var roundKeys = this.roundKeys;
        var state = getState.call(this,block);

        addRoundKey.call(this,state,0);
        var round;
        for(round=1;round<=this.rounds-1;round++) {
            subBytes(state);
//          debug("subBytes: "+round,state.toHex());    
            shiftRows.call(this,state);
//          debug("shiftRows: "+round,state.toHex());    
            mixColumns.call(this,state);
//          debug("mixColumns: "+round,state.toHex());    
            addRoundKey.call(this,
                state,
                round*this.Nb
            );
//          debug("addRoundKey: "+round,state.toHex());    
        }
        subBytes(state);
//      debug("SubBytes "+round,state.toHex());    
        shiftRows.call(this,state);
//      debug("shiftRows "+round,state.toHex());    
        addRoundKey.call(this,state,(this.rounds)*this.Nb);
//      debug("addRoundKey "+round,state.toHex());    
        return toBlock.call(this,state);
    };
    
    /**
     * Encrypts a block using the key from setKey and the keyLength given on construction
	 *
     * @param Uint8Array	The block to Encrypt
     * @returns Uint8Array	The encrypted block
     */
    var invCipher = function(block) {
        var roundKeys = this.roundKeys;
        var state = getState.call(this,block);
        addRoundKey.call(this,state,(this.rounds)*this.Nb);
    
        var round;
        for(round=this.rounds-1;round>0;round--) {
//          debug("invStart "+round,state.toHex());    
            invShiftRows.call(this,state);
//          debug("invShift "+round,state.toHex());    
            invSubBytes(state);
//          debug("invSubBytes: "+round,state.toHex());    
            addRoundKey.call(this,
                state,
                round*this.Nb
            );
//          debug("addRoundKey: "+round,state.toHex());    
            invMixColumns.call(this,state);
//          debug("invMixColumns: "+round,state.toHex());            
        }

        invSubBytes(state);
//      debug("invSubBytes "+round,state.toHex());
        invShiftRows.call(this,state);
//      debug("invShiftRows "+round,state.toHex());    
        addRoundKey.call(this,state,0);
//      debug("addRoundKey "+round,state.toHex());    
        return toBlock.call(this,state);
    };
    
    /**
     * Encrypts the text using the current setup
     * 
     * @param String|Uint8Array The plaintext to encrypt
     * @return Uint8Array	The encrypted result
     */
    this.encrypt = function(text) {
        return cipher.call(this,text);
    };
   
    /**
     * Decrypts the encrypted string using the current setup
     * 
     * @param String|Uint8Array The encrypt data to decrypt
     * @return Uint8Array	The plaintext
     */
    this.decrypt = function(text) {
        return invCipher.call(this,text);
    };
	
    construct.call(this,cfg);
};
