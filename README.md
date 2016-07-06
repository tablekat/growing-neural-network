# growing neural network

... with Stochastic Gradient Descent.

Neural network stuff: `src/nn`  (modify line 135:NeuralNetwork.ts)  
Using it on MNIST handwriting number recognition: `src/mnist` (modify line 19:index.ts and there-around)

Success threshold and the learning rate (eta) are defined in `src/mnist/index.ts`, play with those if you want.
The most interesting I've found is threshold: 0.05, eta: 2.

See tests.txt for some of the results.

This is different from the simple neural network because neurons can be dynamically added to the network DURING training. This can lead to fast training reaching a higher accuracy (according to my like 15 minutes of testing a few times)

### Referred to
[This book thing](http://neuralnetworksanddeeplearning.com/chap1.html) to figure out the SGD related stuff. Converting from gross untyped python code to a language with typing is really annoying.  
I thought I had a cool new idea when I made this, but then I googled around afterwards and found [this page](https://www.willamette.edu/~gorr/classes/cs449/growing.html). RIP  
https://github.com/tablekat/simple-neural-network
