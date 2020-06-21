import React from 'react';
import './dnacrypter.css';
import dnaCrypterImg from './dna-crypter.png';

const dna_dict = {
    '0':"A",
    '1':"G",
    '2':"C",
    '3':"T",
    'A':'0',
    'G':'1',
    'C':'2',
    'T':'3'
}

/* Helper function to add zero padding to integers*/
function pad(num, size) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
}

function encode() {
    var message = document.getElementById("text-message").value;
    var dna = document.getElementById("dna-output");
    var encoded_message = [];

    /* Check if string is ASCII */
    const isASCII = message => /^[\x00-\x7F]*$/.test(message);
    if (!isASCII) {
        dna.value = "Sorry, we currently only process ASCII characters."
        return;
    }

    /* Convert each character in the message into a four base DNA sequence */
    for (var i = 0; i < message.length; i++) {
        var ascii_base4 = pad(message.charCodeAt(i).toString(4), 4);
        var dna_seq = "";
        for (var j = 0; j < ascii_base4.length; j++) {
            dna_seq += dna_dict[ascii_base4.charAt(j)];
        }
        encoded_message.push(dna_seq);
    }
    dna.value = encoded_message.join("");
    return;
}

function decode() {
    var dna_message = document.getElementById("dna-output").value;
    var text = document.getElementById("text-message");
    var decoded_message = [];

    /* Convert each four base DNA sequence into ASCII character */
    var i = 0;
    while ((dna_message.length - i) >= 4) {
        var dna_seq = dna_message.substring(i, i + 4);
        var ascii_base4 = [];
        for (var j = 0; j < dna_seq.length; j++) {
            var nucleotide = dna_seq.charAt(j);
            if (nucleotide in dna_dict) {
                ascii_base4.push(dna_dict[nucleotide]);
            } else {
                text.value= "DNA includes invalid nucleotide '" + nucleotide + "'. Please fix and try again.";
                return;
            }
        }
        ascii_base4 = ascii_base4.join("");
        var ascii_base10 = parseInt(parseInt(ascii_base4, 4).toString(10));
        decoded_message.push(String.fromCharCode(ascii_base10));
        i += 4;
    }
    text.value = decoded_message.join("");
    return;
}

function Dnacrypter() {
  return (
    <div className="Dnacrypter">
        <div className="title-container">
            <h1>dna-crypter</h1>
            <div className="line"></div>
            <div class="spotlight">
                <div class="proj-image">
                    <img  src={dnaCrypterImg} alt="Logo" />
                </div>
                <div class="proj-content">
                    <p><b>dna-crypter</b> is a program that allows users to encode ASCII text as DNA.</p>
                    <p style={{marginTop: '0px'}}> Today, DNA technology is being developed at an unprecedented pace. Out of all the applications of DNA, one in particular 
                        has the chance to revolutionize the entire tech industry: DNA data storage. Instead of bits, we can encode information as nucleotide 
                        (A, C, G, T). It is being <a href="https://www.scientificamerican.com/article/dna-data-storage-is-closer-than-you-think/">developed</a> as we speak. 
                        As with current data, there is a need to protect information. Thus, DNA cryptography, if not already, will become a pressing field in the near future.  </p>
                </div>
            </div>
            <p>If you're interested in coming up with your own encryption, check out the source code here: [<a href="https://github.com/mrland99/dna-crypter">Link</a>]</p>
        </div>
      <div className="flex">
        <div className="input-container">
            <label>Message:</label> 
            <textarea id="text-message" name="text-message" >Enter text here.</textarea>
            <button type="button" onClick={() => {encode()}}>Encrypt!</button>
        </div>
        <div className="output-container">
            <label>DNA:</label>
            <textarea id="dna-output" name="dna-output" >Enter DNA here.</textarea>
            <button type="button" onClick={() => {decode()}}>Decrypt!</button>
        </div>
      </div>
    </div>
  );
}

export default Dnacrypter;