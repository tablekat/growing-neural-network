"use strict";
var Neuron_1 = require('./Neuron');
var NeuronLayer = (function () {
    function NeuronLayer(numInputs, numOutputs, startZero) {
        if (startZero === void 0) { startZero = false; }
        this.numInputs = numInputs;
        this.numOutputs = numOutputs;
        this.neurons = new Array(numOutputs);
        for (var i = 0; i < numOutputs; ++i) {
            this.neurons[i] = new Neuron_1.Neuron(numInputs, startZero);
        }
    }
    NeuronLayer.prototype.feedForward = function (inputs) {
        var res = new Float64Array(this.numOutputs);
        for (var i = 0; i < this.numOutputs; ++i) {
            res[i] = this.neurons[i].feedForward(inputs);
        }
        return res;
    };
    NeuronLayer.prototype.feedForwardRaw = function (inputs) {
        var res = new Float64Array(this.numOutputs);
        for (var i = 0; i < this.numOutputs; ++i) {
            res[i] = this.neurons[i].feedForwardRaw(inputs);
        }
        return res;
    };
    NeuronLayer.prototype.addInput = function () {
        for (var _i = 0, _a = this.neurons; _i < _a.length; _i++) {
            var neuron = _a[_i];
            neuron.addInput();
        }
    };
    NeuronLayer.prototype.addNeuron = function () {
        this.numOutputs++;
        this.neurons[this.numOutputs - 1] = new Neuron_1.Neuron(this.numInputs, true);
    };
    NeuronLayer.prototype.export = function (weights, offset) {
        for (var i = 0; i < this.numInputs; ++i) {
            offset = this.neurons[i].export(weights, offset);
        }
        return offset;
    };
    NeuronLayer.prototype.import = function (weights, offset) {
        for (var i = 0; i < this.numInputs; ++i) {
            offset = this.neurons[i].import(weights, offset);
        }
        return offset;
    };
    NeuronLayer.prototype.getBiases = function () {
        return this.neurons.map(function (neuron) { return neuron.getBias(); });
    };
    NeuronLayer.prototype.putBiases = function (x) {
        for (var i = 0; i < this.neurons.length; ++i) {
            this.neurons[i].putBias(x[i]);
        }
    };
    NeuronLayer.prototype.getWeights = function () {
        return this.neurons.map(function (neuron) { return neuron.getWeights(); });
    };
    NeuronLayer.prototype.putWeights = function (ws) {
        for (var i = 0; i < this.numOutputs; ++i) {
            this.neurons[i].putWeights(ws[i]);
        }
    };
    return NeuronLayer;
}());
exports.NeuronLayer = NeuronLayer;
