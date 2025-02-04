## Classes

<dl>
<dt><a href="#AudioMIDI">AudioMIDI</a> ⇐ <code>DataBuffer</code></dt>
<dd><p>AudioMIDI - MIDI Utility
MIDI File Format Parser &amp; Generator</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#WritableNote">WritableNote</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#WritableTrack">WritableTrack</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#NoteData">NoteData</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#SysExData">SysExData</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#EventData">EventData</a> : <code>string</code> | <code>number</code> | <code>Uint8Array</code> | <code><a href="#NoteData">NoteData</a></code> | <code><a href="#SysExData">SysExData</a></code></dt>
<dd></dd>
<dt><a href="#MidiTrackEvent">MidiTrackEvent</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Header">Header</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#Track">Track</a> : <code>object</code></dt>
<dd></dd>
<dt><a href="#UsedNote">UsedNote</a> : <code>object</code></dt>
<dd></dd>
</dl>

<a name="AudioMIDI"></a>

## AudioMIDI ⇐ <code>DataBuffer</code>
AudioMIDI - MIDI Utility
MIDI File Format Parser & Generator

**Kind**: global class  
**Extends**: <code>DataBuffer</code>  

* [AudioMIDI](#AudioMIDI) ⇐ <code>DataBuffer</code>
    * [new AudioMIDI([input], [options])](#new_AudioMIDI_new)
    * _instance_
        * [.format](#AudioMIDI+format) : <code>number</code>
        * [.trackCount](#AudioMIDI+trackCount) : <code>number</code>
        * [.timeDivision](#AudioMIDI+timeDivision) : <code>number</code>
        * [.chunks](#AudioMIDI+chunks) : [<code>Array.&lt;Track&gt;</code>](#Track)
        * [.readVariableLengthValues](#AudioMIDI+readVariableLengthValues) ⇒ <code>number</code>
        * [.parse()](#AudioMIDI+parse)
        * [.addTrack()](#AudioMIDI+addTrack) ⇒ [<code>Track</code>](#Track)
        * [.addEvent(track, event)](#AudioMIDI+addEvent)
        * [.saveToDataBuffer()](#AudioMIDI+saveToDataBuffer) ⇒ <code>DataBuffer</code>
        * [.writeChunk(dataBuffer, chunk)](#AudioMIDI+writeChunk)
        * [.writeEvent(dataBuffer, event)](#AudioMIDI+writeEvent)
        * [.getUsedNotes()](#AudioMIDI+getUsedNotes) ⇒ [<code>Array.&lt;UsedNote&gt;</code>](#UsedNote)
        * [.validate()](#AudioMIDI+validate) ⇒ <code>Array.&lt;string&gt;</code>
    * _static_
        * [.decodeHeader(chunk)](#AudioMIDI.decodeHeader) ⇒ [<code>Header</code>](#Header)
        * [.getControllerLabel(controller)](#AudioMIDI.getControllerLabel) ⇒ <code>string</code>
        * [.getManufacturerLabel(manufacturerId)](#AudioMIDI.getManufacturerLabel) ⇒ <code>string</code>
        * [.writeVariableLengthValue(dataBuffer, value)](#AudioMIDI.writeVariableLengthValue)
        * [.writeEventData(dataBuffer, data)](#AudioMIDI.writeEventData)
        * [.generateTempoEvent(bpm)](#AudioMIDI.generateTempoEvent) ⇒ [<code>MidiTrackEvent</code>](#MidiTrackEvent)
        * [.generateMetaStringEvent(metaType, data)](#AudioMIDI.generateMetaStringEvent) ⇒ [<code>MidiTrackEvent</code>](#MidiTrackEvent)
        * [.generateEndOfTrackEvent()](#AudioMIDI.generateEndOfTrackEvent) ⇒ [<code>MidiTrackEvent</code>](#MidiTrackEvent)
        * [.convertToMidi(options)](#AudioMIDI.convertToMidi) ⇒ [<code>AudioMIDI</code>](#AudioMIDI)
        * [.noteToMidi(noteString, [octaveOffset], [noteMap])](#AudioMIDI.noteToMidi) ⇒ <code>number</code>
        * [.midiToNote(midiValue, [octaveOffset], [noteNames])](#AudioMIDI.midiToNote) ⇒ <code>string</code>

<a name="new_AudioMIDI_new"></a>

### new AudioMIDI([input], [options])
Creates a new AudioMIDI.


| Param | Type | Description |
| --- | --- | --- |
| [input] | <code>Array.&lt;number&gt;</code> \| <code>ArrayBuffer</code> \| <code>Buffer</code> \| <code>DataBuffer</code> \| <code>Int8Array</code> \| <code>Int16Array</code> \| <code>Int32Array</code> \| <code>number</code> \| <code>string</code> \| <code>Uint8Array</code> \| <code>Uint16Array</code> \| <code>Uint32Array</code> \| <code>undefined</code> | The data to process. |
| [options] | <code>object</code> | Options for this AudioMIDI instance. |
| [options.format] | <code>number</code> | The MIDI format: 0, 1, or 2, default is 0. |
| [options.timeDivision] | <code>number</code> | The indication of how MIDI ticks should be translated into time, default is 128. |

**Example** *(AudioMIDI)*  
```js
const data = fs.readFileSync('./song.mid');
const file = new AudioMIDI(data);
file.parse();
console.log('Chunks:', file.chunks);
```
<a name="AudioMIDI+format"></a>

### audioMIDI.format : <code>number</code>
The MIDI format: 0, 1, or 2

**Kind**: instance property of [<code>AudioMIDI</code>](#AudioMIDI)  
<a name="AudioMIDI+trackCount"></a>

### audioMIDI.trackCount : <code>number</code>
The internal track count.

**Kind**: instance property of [<code>AudioMIDI</code>](#AudioMIDI)  
<a name="AudioMIDI+timeDivision"></a>

### audioMIDI.timeDivision : <code>number</code>
The indication of how MIDI ticks should be translated into time.

**Kind**: instance property of [<code>AudioMIDI</code>](#AudioMIDI)  
<a name="AudioMIDI+chunks"></a>

### audioMIDI.chunks : [<code>Array.&lt;Track&gt;</code>](#Track)
**Kind**: instance property of [<code>AudioMIDI</code>](#AudioMIDI)  
<a name="AudioMIDI+readVariableLengthValues"></a>

### audioMIDI.readVariableLengthValues ⇒ <code>number</code>
Several different values in events are expressed as variable length quantities (e.g. delta time values).
A variable length value uses a minimum number of bytes to hold the value, and in most circumstances this leads to some degree of data compresssion.

A variable length value uses the low order 7 bits of a byte to represent the value or part of the value.
The high order bit is an "escape" or "continuation" bit.
All but the last byte of a variable length value have the high order bit set.
The last byte has the high order bit cleared.
The bytes always appear most significant byte first.

**Kind**: instance property of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: <code>number</code> - The length of the next chunk.  
<a name="AudioMIDI+parse"></a>

### audioMIDI.parse()
Parse a MIDI file from a Uint8Array.

**Kind**: instance method of [<code>AudioMIDI</code>](#AudioMIDI)  
**See**

- [ Expanded MIDI 1.0 Messages List (Status Bytes)](https://midi.org/expanded-midi-1-0-messages-list)
- [ MIDI 1.0 Universal System Exclusive Messages](https://midi.org/midi-1-0-universal-system-exclusive-messages)
- [ DLS Proprietary Chunk IDs](https://midi.org/dls-proprietary-chunk-ids)

<a name="AudioMIDI+addTrack"></a>

### audioMIDI.addTrack() ⇒ [<code>Track</code>](#Track)
Adds a new track to the MIDI file.

**Kind**: instance method of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: [<code>Track</code>](#Track) - The new track.  
<a name="AudioMIDI+addEvent"></a>

### audioMIDI.addEvent(track, event)
Adds an event to a track.

**Kind**: instance method of [<code>AudioMIDI</code>](#AudioMIDI)  

| Param | Type | Description |
| --- | --- | --- |
| track | [<code>Track</code>](#Track) | The track to add the event to. |
| event | <code>Event</code> \| <code>Array.&lt;Event&gt;</code> | The event to add. |

<a name="AudioMIDI+saveToDataBuffer"></a>

### audioMIDI.saveToDataBuffer() ⇒ <code>DataBuffer</code>
Writes the MIDI data to a binary file.

**Kind**: instance method of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: <code>DataBuffer</code> - The binary data buffer.  
<a name="AudioMIDI+writeChunk"></a>

### audioMIDI.writeChunk(dataBuffer, chunk)
Write a track chunk to the data buffer.

**Kind**: instance method of [<code>AudioMIDI</code>](#AudioMIDI)  

| Param | Type | Description |
| --- | --- | --- |
| dataBuffer | <code>DataBuffer</code> | The data buffer to write to. |
| chunk | [<code>Track</code>](#Track) | The track chunk to write. |

<a name="AudioMIDI+writeEvent"></a>

### audioMIDI.writeEvent(dataBuffer, event)
Helper function to write an event to the data buffer.

**Kind**: instance method of [<code>AudioMIDI</code>](#AudioMIDI)  

| Param | Type | Description |
| --- | --- | --- |
| dataBuffer | <code>DataBuffer</code> | The data buffer to write to. |
| event | [<code>MidiTrackEvent</code>](#MidiTrackEvent) | The event to write. |

<a name="AudioMIDI+getUsedNotes"></a>

### audioMIDI.getUsedNotes() ⇒ [<code>Array.&lt;UsedNote&gt;</code>](#UsedNote)
Returns a sorted list of all unique note numbers used in "Note On" events,
along with their note names (e.g. "C3", "D#4").

**Kind**: instance method of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: [<code>Array.&lt;UsedNote&gt;</code>](#UsedNote) - Array of note data  
<a name="AudioMIDI+validate"></a>

### audioMIDI.validate() ⇒ <code>Array.&lt;string&gt;</code>
Validate a MIDI instance for common issues.
Matching Note Ons / Offs: A `velocity > 0` "Note On" increments `activeNotes[note]`. A "Note Off" or "Note On" with `velocity == 0` decrements. If the count is already 0, that is invalid. At the end of the track, if any notes still have a positive count, that is also invalid.
Meta Events: We do a small switch on `event.metaType` to check if the declared metaEventLength is correct for well-known meta events (End of Track, Set Tempo, Time Signature, etc.).
Chunk Length: Since the parser already stored each chunk's `chunkLength`, we do minimal checks: if `chunkLength > 0` but there are zero events, or vice versa, that is unusual.

**Kind**: instance method of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: <code>Array.&lt;string&gt;</code> - Array of warning / error messages discovered, an empty array if no issues are found.  
<a name="AudioMIDI.decodeHeader"></a>

### AudioMIDI.decodeHeader(chunk) ⇒ [<code>Header</code>](#Header)
Decodes and validates MIDI Header.
Checks for `MThd` header, reads the chunk length, format, track count, and PPQN (pulses per quarter note) / PPQ (pulses per quarter) / PQN (per quarter note) / TPQN (ticks per quarter note) / TPB (ticks per beat).

Signature (Decimal): [77, 84, 104, 100, ...]
Signature (Hexadecimal): [4D, 54, 68, 64, ...]
Signature (ASCII): [M, T, h, d, ...]

**Kind**: static method of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: [<code>Header</code>](#Header) - The decoded values.  
**Throws**:

- <code>Error</code> Invalid WAV header


| Param | Type | Description |
| --- | --- | --- |
| chunk | <code>Buffer</code> \| <code>string</code> \| <code>Uint8Array</code> | Data Blob |

<a name="AudioMIDI.getControllerLabel"></a>

### AudioMIDI.getControllerLabel(controller) ⇒ <code>string</code>
Return the human readable controller name from the ID.

**Kind**: static method of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: <code>string</code> - The human-readable controller name.  
**See**

- [ MidiKit Help Controllers](https://www.mixagesoftware.com/en/midikit/help/)
- [ MIDI 1.0 Control Change Messages (Data Bytes)](https://midi.org/midi-1-0-control-change-messages)


| Param | Type | Description |
| --- | --- | --- |
| controller | <code>number</code> | The controller ID. |

<a name="AudioMIDI.getManufacturerLabel"></a>

### AudioMIDI.getManufacturerLabel(manufacturerId) ⇒ <code>string</code>
Return the human readable manufacturer name from the ID.

**Kind**: static method of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: <code>string</code> - The human-readable manufacturer name.  
**See**: [ MidiKit Help MIDI Manufacturers List](https://www.mixagesoftware.com/en/midikit/help/HTML/manufacturers.html)  

| Param | Type | Description |
| --- | --- | --- |
| manufacturerId | <code>number</code> | The manufacturer ID. |

<a name="AudioMIDI.writeVariableLengthValue"></a>

### AudioMIDI.writeVariableLengthValue(dataBuffer, value)
Write a variable-length value.

**Kind**: static method of [<code>AudioMIDI</code>](#AudioMIDI)  

| Param | Type | Description |
| --- | --- | --- |
| dataBuffer | <code>DataBuffer</code> | The data buffer to write to. |
| value | <code>number</code> | The value to write as a variable-length quantity. |

<a name="AudioMIDI.writeEventData"></a>

### AudioMIDI.writeEventData(dataBuffer, data)
Write event data.

**Kind**: static method of [<code>AudioMIDI</code>](#AudioMIDI)  

| Param | Type | Description |
| --- | --- | --- |
| dataBuffer | <code>DataBuffer</code> | The data buffer to write to. |
| data | <code>Uint8Array</code> \| <code>Array.&lt;number&gt;</code> | The event data to write. |

<a name="AudioMIDI.generateTempoEvent"></a>

### AudioMIDI.generateTempoEvent(bpm) ⇒ [<code>MidiTrackEvent</code>](#MidiTrackEvent)
Generate a Set Tempo event with a provided BPM.

**Kind**: static method of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: [<code>MidiTrackEvent</code>](#MidiTrackEvent) - The tempo event with the correct byte values.  

| Param | Type | Description |
| --- | --- | --- |
| bpm | <code>number</code> | The desired tempo in Beats Per Minute. |

<a name="AudioMIDI.generateMetaStringEvent"></a>

### AudioMIDI.generateMetaStringEvent(metaType, data) ⇒ [<code>MidiTrackEvent</code>](#MidiTrackEvent)
Generate a Meta String event:
- 0x01: 'Text Event'
- 0x02: 'Copyright Notice'
- 0x03: 'Sequence / Track Name'
- 0x04: 'Instrument Name'
- 0x05: 'Lyrics'
- 0x06: 'Marker'
- 0x07: 'Cue Point'
- 0x08: 'Program Name'
- 0x09: 'Device (Port) Name'

**Kind**: static method of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: [<code>MidiTrackEvent</code>](#MidiTrackEvent) - The meta string event with the encoded string data.  

| Param | Type | Description |
| --- | --- | --- |
| metaType | <code>number</code> | The meta event type. (e.g., 0x03 for Track Name). |
| data | <code>string</code> | The string value for the event (e.g., the name of the track). |

<a name="AudioMIDI.generateEndOfTrackEvent"></a>

### AudioMIDI.generateEndOfTrackEvent() ⇒ [<code>MidiTrackEvent</code>](#MidiTrackEvent)
Generate an end of track event.

**Kind**: static method of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: [<code>MidiTrackEvent</code>](#MidiTrackEvent) - The end of track event.  
<a name="AudioMIDI.convertToMidi"></a>

### AudioMIDI.convertToMidi(options) ⇒ [<code>AudioMIDI</code>](#AudioMIDI)
Convert a collection of tracks and notes into a new AudioMIDI instance.

**Kind**: static method of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: [<code>AudioMIDI</code>](#AudioMIDI) - The newly constured MIDI  

| Param | Type | Description |
| --- | --- | --- |
| options | <code>object</code> | The options |
| [options.ppq] | <code>number</code> | The pulses per quarter note, default is 480. |
| [options.bpm] | <code>number</code> | The BPM of the track, when blank no tempo event will be added. |
| [options.tracks] | [<code>Array.&lt;WritableTrack&gt;</code>](#WritableTrack) | The MIDI tracks to write. |
| [options.skipNotes] | <code>Array.&lt;number&gt;</code> | The MIDI notes to ship, if any. |

**Example**  
```js
const midi = AudioMIDI.convertToMidi({
  bpm,
  ppq,
  tracks: [
    {
      notes: myCustomNotes.map((note) => {
        return {
          note: note.midiNote,
          velocity: note.velocity,
          length: note.length,
        }
      }),
      metaStringEvents: {
        0x03: `Custom MIDI`,
      },
    }
  ],
  skipNotes: [128],
});
return midi;
```
<a name="AudioMIDI.noteToMidi"></a>

### AudioMIDI.noteToMidi(noteString, [octaveOffset], [noteMap]) ⇒ <code>number</code>
Convert a note string like `C1` or `D#2` to the MIDI value.

**Kind**: static method of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: <code>number</code> - The MIDI value for the provided note.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| noteString | <code>string</code> |  | The notation string. |
| [octaveOffset] | <code>number</code> | <code>2</code> | The default octave offset for C1, where a value of 2 means C1 = 36; default is 2. |
| [noteMap] | <code>Record.&lt;string, number&gt;</code> |  | The note map to use for the conversion. |

**Example**  
```js
AudioMIDI.noteToMidi('C4') === 72
AudioMIDI.noteToMidi('C3') === 60
AudioMIDI.noteToMidi('C2') === 48
AudioMIDI.noteToMidi('C1') === 36
AudioMIDI.noteToMidi('C-1') === 12
AudioMIDI.noteToMidi('C-2') === 0
```
<a name="AudioMIDI.midiToNote"></a>

### AudioMIDI.midiToNote(midiValue, [octaveOffset], [noteNames]) ⇒ <code>string</code>
Convert a MIDI value back to a note string like `C1` or `D#2`.

**Kind**: static method of [<code>AudioMIDI</code>](#AudioMIDI)  
**Returns**: <code>string</code> - The note label corresponding to the MIDI value.  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| midiValue | <code>number</code> |  | The MIDI value (0-127). |
| [octaveOffset] | <code>number</code> | <code>2</code> | The default octave offset for C1, where a value of 2 means C1 = 36; default is 2. |
| [noteNames] | <code>Array.&lt;string&gt;</code> |  | The note names to use for the conversion. |

**Example**  
```js
AudioMIDI.midiToNote(72) === 'C4'
AudioMIDI.midiToNote(60) === 'C3'
AudioMIDI.midiToNote(48) === 'C2'
AudioMIDI.midiToNote(36) === 'C1'
AudioMIDI.midiToNote(12) === 'C-1'
AudioMIDI.midiToNote(0) === 'C-2'
```
<a name="WritableNote"></a>

## WritableNote : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| ticks | <code>number</code> | The delay in ticks until the next track. |
| midiNote | <code>number</code> | The MIDI note value. |
| velocity | <code>number</code> | The velocity of the note (0-127). |
| length | <code>number</code> | The length of the note in ticks. |

<a name="WritableTrack"></a>

## WritableTrack : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [bpm] | <code>number</code> | The BPM of the track, when blank no tempo event will be added. |
| [metaStringEvents] | <code>Record.&lt;number, string&gt;</code> | A key value collection of meta events to add where they key is the event type and the value is the data to add. |
| [notes] | [<code>Array.&lt;WritableNote&gt;</code>](#WritableNote) | A collection of notes to write on the track. |

<a name="NoteData"></a>

## NoteData : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| note | <code>string</code> | A note value. |
| velocity | <code>number</code> | The velocity of the note (0-127). |
| length | <code>number</code> | The length of the note in ticks. |

<a name="SysExData"></a>

## SysExData : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| manufacturerId | <code>number</code> | The manufacturer's ID code. |
| manufacturerLabel | <code>string</code> | The manufacturer's label based on the ID. |
| data | <code>Array.&lt;number&gt;</code> | The SysEx data bytes. |

<a name="EventData"></a>

## EventData : <code>string</code> \| <code>number</code> \| <code>Uint8Array</code> \| [<code>NoteData</code>](#NoteData) \| [<code>SysExData</code>](#SysExData)
**Kind**: global typedef  
<a name="MidiTrackEvent"></a>

## MidiTrackEvent : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| deltaTime | <code>number</code> | The delta time of the MIDI event. |
| type | <code>number</code> | The type of the event (e.g., meta event, regular event). |
| label | <code>string</code> | A human-readable label describing the event. |
| data | [<code>EventData</code>](#EventData) | The data associated with the event. |
| [metaType] | <code>number</code> | The subtype of the meta event. |
| [metaEventLength] | <code>number</code> | The length of the meta event data. |
| [channel] | <code>number</code> | The MIDI channel the event is for. |
| [tag] | <code>number</code> | The tag for the M-Live Tag event. |

<a name="Header"></a>

## Header : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the chunk (e.g., MThd, MTrk). |
| format | <code>number</code> | The format of the MIDI file (header only). |
| trackCount | <code>number</code> | The number of tracks in the MIDI file (header only). |
| timeDivision | <code>number</code> | The time division of the MIDI file (header only). |
| chunkLength | <code>number</code> | The length of the chunk data. |

<a name="Track"></a>

## Track : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | The type of the chunk (e.g., MThd, MTrk). |
| chunkLength | <code>number</code> | The length of the chunk data. |
| events | [<code>Array.&lt;MidiTrackEvent&gt;</code>](#MidiTrackEvent) | The collection of events in the track. |

<a name="UsedNote"></a>

## UsedNote : <code>object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| noteNumber | <code>number</code> | The numeric value of the note. |
| noteString | <code>string</code> | The human-readable note string. |

