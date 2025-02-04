export default AudioMIDI;
export type WritableNote = {
    /**
     * The delay in ticks until the next track.
     */
    ticks: number;
    /**
     * The MIDI note value.
     */
    midiNote: number;
    /**
     * The velocity of the note (0-127).
     */
    velocity: number;
    /**
     * The length of the note in ticks.
     */
    length: number;
};
export type WritableTrack = {
    /**
     * The BPM of the track, when blank no tempo event will be added.
     */
    bpm?: number;
    /**
     * A key value collection of meta events to add where they key is the event type and the value is the data to add.
     */
    metaStringEvents?: Record<number, string>;
    /**
     * A collection of notes to write on the track.
     */
    notes?: WritableNote[];
};
export type NoteData = {
    /**
     * A note value.
     */
    note: string;
    /**
     * The velocity of the note (0-127).
     */
    velocity: number;
    /**
     * The length of the note in ticks.
     */
    length: number;
};
export type SysExData = {
    /**
     * The manufacturer's ID code.
     */
    manufacturerId: number;
    /**
     * The manufacturer's label based on the ID.
     */
    manufacturerLabel: string;
    /**
     * The SysEx data bytes.
     */
    data: number[];
};
export type EventData = string | number | Uint8Array | NoteData | SysExData;
export type MidiTrackEvent = {
    /**
     * The delta time of the MIDI event.
     */
    deltaTime: number;
    /**
     * The type of the event (e.g., meta event, regular event).
     */
    type: number;
    /**
     * A human-readable label describing the event.
     */
    label: string;
    /**
     * The data associated with the event.
     */
    data: EventData;
    /**
     * The subtype of the meta event.
     */
    metaType?: number;
    /**
     * The length of the meta event data.
     */
    metaEventLength?: number;
    /**
     * The MIDI channel the event is for.
     */
    channel?: number;
    /**
     * The tag for the M-Live Tag event.
     */
    tag?: number;
};
export type Header = {
    /**
     * The type of the chunk (e.g., MThd, MTrk).
     */
    type: string;
    /**
     * The format of the MIDI file (header only).
     */
    format: number;
    /**
     * The number of tracks in the MIDI file (header only).
     */
    trackCount: number;
    /**
     * The time division of the MIDI file (header only).
     */
    timeDivision: number;
    /**
     * The length of the chunk data.
     */
    chunkLength: number;
};
export type Track = {
    /**
     * The type of the chunk (e.g., MThd, MTrk).
     */
    type: string;
    /**
     * The length of the chunk data.
     */
    chunkLength: number;
    /**
     * The collection of events in the track.
     */
    events: MidiTrackEvent[];
};
export type UsedNote = {
    /**
     * The numeric value of the note.
     */
    noteNumber: number;
    /**
     * The human-readable note string.
     */
    noteString: string;
};
/**
 * @typedef {object} WritableNote
 * @property {number} ticks The delay in ticks until the next track.
 * @property {number} midiNote The MIDI note value.
 * @property {number} velocity The velocity of the note (0-127).
 * @property {number} length The length of the note in ticks.
 */
/**
 * @typedef {object} WritableTrack
 * @property {number} [bpm] The BPM of the track, when blank no tempo event will be added.
 * @property {Record<number, string>} [metaStringEvents] A key value collection of meta events to add where they key is the event type and the value is the data to add.
 * @property {WritableNote[]} [notes] A collection of notes to write on the track.
 */
/**
 * @typedef {object} NoteData
 * @property {string} note A note value.
 * @property {number} velocity The velocity of the note (0-127).
 * @property {number} length The length of the note in ticks.
 */
/**
 * @typedef {object} SysExData
 * @property {number} manufacturerId The manufacturer's ID code.
 * @property {string} manufacturerLabel The manufacturer's label based on the ID.
 * @property {number[]} data The SysEx data bytes.
 */
/**
 * @typedef {string | number | Uint8Array | NoteData | SysExData} EventData
 */
/**
 * @typedef {object} MidiTrackEvent
 * @property {number} deltaTime The delta time of the MIDI event.
 * @property {number} type The type of the event (e.g., meta event, regular event).
 * @property {string} label A human-readable label describing the event.
 * @property {EventData} data The data associated with the event.
 * @property {number} [metaType] The subtype of the meta event.
 * @property {number} [metaEventLength] The length of the meta event data.
 * @property {number} [channel] The MIDI channel the event is for.
 * @property {number} [tag] The tag for the M-Live Tag event.
 */
/**
 * @typedef {object} Header
 * @property {string} type The type of the chunk (e.g., MThd, MTrk).
 * @property {number} format The format of the MIDI file (header only).
 * @property {number} trackCount The number of tracks in the MIDI file (header only).
 * @property {number} timeDivision The time division of the MIDI file (header only).
 * @property {number} chunkLength The length of the chunk data.
 */
/**
 * @typedef {object} Track
 * @property {string} type The type of the chunk (e.g., MThd, MTrk).
 * @property {number} chunkLength The length of the chunk data.
 * @property {MidiTrackEvent[]} events The collection of events in the track.
 */
/**
 * @typedef {object} UsedNote
 * @property {number} noteNumber The numeric value of the note.
 * @property {string} noteString The human-readable note string.
 */
/**
 * AudioMIDI - MIDI Utility
 * MIDI File Format Parser & Generator
 * @example <caption>AudioMIDI</caption>
 * const data = fs.readFileSync('./song.mid');
 * const file = new AudioMIDI(data);
 * file.parse();
 * console.log('Chunks:', file.chunks);
 * @class
 * @augments DataBuffer
 */
declare class AudioMIDI extends DataBuffer {
    /**
     * Decodes and validates MIDI Header.
     * Checks for `MThd` header, reads the chunk length, format, track count, and PPQN (pulses per quarter note) / PPQ (pulses per quarter) / PQN (per quarter note) / TPQN (ticks per quarter note) / TPB (ticks per beat).
     *
     * Signature (Decimal): [77, 84, 104, 100, ...]
     * Signature (Hexadecimal): [4D, 54, 68, 64, ...]
     * Signature (ASCII): [M, T, h, d, ...]
     * @static
     * @param {Buffer|string|Uint8Array} chunk  Data Blob
     * @returns {Header} The decoded values.
     * @throws {Error} Invalid WAV header
     */
    static decodeHeader(chunk: Buffer | string | Uint8Array): Header;
    /**
     * Return the human readable controller name from the ID.
     * @param {number} controller The controller ID.
     * @returns {string} The human-readable controller name.
     * @see {@link https://www.mixagesoftware.com/en/midikit/help/ | MidiKit Help Controllers}
     * @see {@link https://midi.org/midi-1-0-control-change-messages | MIDI 1.0 Control Change Messages (Data Bytes)}
     * @static
     */
    static getControllerLabel(controller: number): string;
    /**
     * Return the human readable manufacturer name from the ID.
     * @param {number} manufacturerId The manufacturer ID.
     * @returns {string} The human-readable manufacturer name.
     * @see {@link https://www.mixagesoftware.com/en/midikit/help/HTML/manufacturers.html | MidiKit Help MIDI Manufacturers List}
     * @static
     */
    static getManufacturerLabel(manufacturerId: number): string;
    /**
     * Write a variable-length value.
     * @param {DataBuffer} dataBuffer The data buffer to write to.
     * @param {number} value The value to write as a variable-length quantity.
     * @static
     */
    static writeVariableLengthValue(dataBuffer: DataBuffer, value: number): void;
    /**
     * Write event data.
     * @param {DataBuffer} dataBuffer The data buffer to write to.
     * @param {Uint8Array | number[]} data The event data to write.
     * @static
     */
    static writeEventData(dataBuffer: DataBuffer, data: Uint8Array | number[]): void;
    /**
     * Generate a Set Tempo event with a provided BPM.
     * @param {number} bpm The desired tempo in Beats Per Minute.
     * @returns {MidiTrackEvent} The tempo event with the correct byte values.
     * @static
     */
    static generateTempoEvent(bpm: number): MidiTrackEvent;
    /**
     * Generate a Meta String event:
     * - 0x01: 'Text Event'
     * - 0x02: 'Copyright Notice'
     * - 0x03: 'Sequence / Track Name'
     * - 0x04: 'Instrument Name'
     * - 0x05: 'Lyrics'
     * - 0x06: 'Marker'
     * - 0x07: 'Cue Point'
     * - 0x08: 'Program Name'
     * - 0x09: 'Device (Port) Name'
     * @param {number} metaType The meta event type. (e.g., 0x03 for Track Name).
     * @param {string} data The string value for the event (e.g., the name of the track).
     * @returns {MidiTrackEvent} The meta string event with the encoded string data.
     * @static
     */
    static generateMetaStringEvent(metaType: number, data: string): MidiTrackEvent;
    /**
     * Generate an end of track event.
     * @returns {MidiTrackEvent} The end of track event.
     * @static
     */
    static generateEndOfTrackEvent(): MidiTrackEvent;
    /**
     * Convert a collection of tracks and notes into a new AudioMIDI instance.
     * @param {object} options The options
     * @param {number} [options.ppq] The pulses per quarter note, default is 480.
     * @param {number} [options.bpm] The BPM of the track, when blank no tempo event will be added.
     * @param {WritableTrack[]} [options.tracks] The MIDI tracks to write.
     * @param {number[]} [options.skipNotes] The MIDI notes to ship, if any.
     * @returns {AudioMIDI} The newly constured MIDI
     * @static
     * @example
     * const midi = AudioMIDI.convertToMidi({
     *   bpm,
     *   ppq,
     *   tracks: [
     *     {
     *       notes: myCustomNotes.map((note) => {
     *         return {
     *           note: note.midiNote,
     *           velocity: note.velocity,
     *           length: note.length,
     *         }
     *       }),
     *       metaStringEvents: {
     *         0x03: `Custom MIDI`,
     *       },
     *     }
     *   ],
     *   skipNotes: [128],
     * });
     * return midi;
     */
    static convertToMidi({ ppq, bpm, tracks, skipNotes }: {
        ppq?: number;
        bpm?: number;
        tracks?: WritableTrack[];
        skipNotes?: number[];
    }): AudioMIDI;
    /**
     * Convert a note string like `C1` or `D#2` to the MIDI value.
     * @param {string} noteString The notation string.
     * @param {number} [octaveOffset] The default octave offset for C1, where a value of 2 means C1 = 36; default is 2.
     * @param {Record<string, number>} [noteMap] The note map to use for the conversion.
     * @returns {number} The MIDI value for the provided note.
     * @example
     * AudioMIDI.noteToMidi('C4') === 72
     * AudioMIDI.noteToMidi('C3') === 60
     * AudioMIDI.noteToMidi('C2') === 48
     * AudioMIDI.noteToMidi('C1') === 36
     * AudioMIDI.noteToMidi('C-1') === 12
     * AudioMIDI.noteToMidi('C-2') === 0
     */
    static noteToMidi(noteString: string, octaveOffset?: number, noteMap?: Record<string, number>): number;
    /**
     * Convert a MIDI value back to a note string like `C1` or `D#2`.
     * @param {number} midiValue The MIDI value (0-127).
     * @param {number} [octaveOffset] The default octave offset for C1, where a value of 2 means C1 = 36; default is 2.
     * @param {string[]} [noteNames] The note names to use for the conversion.
     * @returns {string} The note label corresponding to the MIDI value.
     * @example
     * AudioMIDI.midiToNote(72) === 'C4'
     * AudioMIDI.midiToNote(60) === 'C3'
     * AudioMIDI.midiToNote(48) === 'C2'
     * AudioMIDI.midiToNote(36) === 'C1'
     * AudioMIDI.midiToNote(12) === 'C-1'
     * AudioMIDI.midiToNote(0) === 'C-2'
     */
    static midiToNote(midiValue: number, octaveOffset?: number, noteNames?: string[]): string;
    /**
     * Creates a new AudioMIDI.
     * @param {number[]|ArrayBuffer|Buffer|DataBuffer|Int8Array|Int16Array|Int32Array|number|string|Uint8Array|Uint16Array|Uint32Array|undefined} [input] The data to process.
     * @param {object} [options] Options for this AudioMIDI instance.
     * @param {number} [options.format] The MIDI format: 0, 1, or 2, default is 0.
     * @param {number} [options.timeDivision] The indication of how MIDI ticks should be translated into time, default is 128.
     * @class
     */
    constructor(input?: number[] | ArrayBuffer | Buffer | DataBuffer | Int8Array | Int16Array | Int32Array | number | string | Uint8Array | Uint16Array | Uint32Array | undefined, options?: {
        format?: number;
        timeDivision?: number;
    });
    /** @type {number} The MIDI format: 0, 1, or 2 */
    format: number;
    /** @type {number} The internal track count. */
    trackCount: number;
    /** @type {number} The indication of how MIDI ticks should be translated into time. */
    timeDivision: number;
    /** @type {Track[]} */
    chunks: Track[];
    options: {
        format?: number;
        timeDivision?: number;
    };
    /**
     * Several different values in events are expressed as variable length quantities (e.g. delta time values).
     * A variable length value uses a minimum number of bytes to hold the value, and in most circumstances this leads to some degree of data compresssion.
     *
     * A variable length value uses the low order 7 bits of a byte to represent the value or part of the value.
     * The high order bit is an "escape" or "continuation" bit.
     * All but the last byte of a variable length value have the high order bit set.
     * The last byte has the high order bit cleared.
     * The bytes always appear most significant byte first.
     * @returns {number} The length of the next chunk.
     */
    readVariableLengthValues: () => number;
    /**
     * Parse a MIDI file from a Uint8Array.
     * @see {@link https://midi.org/expanded-midi-1-0-messages-list | Expanded MIDI 1.0 Messages List (Status Bytes)}
     * @see {@link https://midi.org/midi-1-0-universal-system-exclusive-messages | MIDI 1.0 Universal System Exclusive Messages}
     * @see {@link https://midi.org/dls-proprietary-chunk-ids | DLS Proprietary Chunk IDs}
     */
    parse(): void;
    /**
     * Adds a new track to the MIDI file.
     * @returns {Track} The new track.
     */
    addTrack(): Track;
    /**
     * Adds an event to a track.
     * @param {Track} track - The track to add the event to.
     * @param {Event | Event[]} event - The event to add.
     */
    addEvent(track: Track, event: Event | Event[]): void;
    /**
     * Writes the MIDI data to a binary file.
     * @returns {DataBuffer} The binary data buffer.
     */
    saveToDataBuffer(): DataBuffer;
    /**
     * Write a track chunk to the data buffer.
     * @param {DataBuffer} dataBuffer The data buffer to write to.
     * @param {Track} chunk The track chunk to write.
     */
    writeChunk(dataBuffer: DataBuffer, chunk: Track): void;
    /**
     * Helper function to write an event to the data buffer.
     * @param {DataBuffer} dataBuffer The data buffer to write to.
     * @param {MidiTrackEvent} event The event to write.
     */
    writeEvent(dataBuffer: DataBuffer, event: MidiTrackEvent): void;
    /**
     * Returns a sorted list of all unique note numbers used in "Note On" events,
     * along with their note names (e.g. "C3", "D#4").
     * @returns {UsedNote[]} Array of note data
     */
    getUsedNotes(): UsedNote[];
    /**
     * Validate a MIDI instance for common issues.
     * Matching Note Ons / Offs: A `velocity > 0` "Note On" increments `activeNotes[note]`. A "Note Off" or "Note On" with `velocity == 0` decrements. If the count is already 0, that is invalid. At the end of the track, if any notes still have a positive count, that is also invalid.
     * Meta Events: We do a small switch on `event.metaType` to check if the declared metaEventLength is correct for well-known meta events (End of Track, Set Tempo, Time Signature, etc.).
     * Chunk Length: Since the parser already stored each chunk's `chunkLength`, we do minimal checks: if `chunkLength > 0` but there are zero events, or vice versa, that is unusual.
     * @returns {string[]} Array of warning / error messages discovered, an empty array if no issues are found.
     */
    validate(): string[];
}
import { DataBuffer } from '@uttori/data-tools';
//# sourceMappingURL=index.d.ts.map