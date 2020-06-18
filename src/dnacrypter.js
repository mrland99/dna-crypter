import React from 'react';
import './dnacrypter.css';

const dna_dict = {
    '0':"A",
    '1':"C",
    '2':"G",
    '3':"T",
    'A':'0',
    'C':'1',
    'G':'2',
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
}

function Dnacrypter() {
  return (
    <div className="Dnacrypter">
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