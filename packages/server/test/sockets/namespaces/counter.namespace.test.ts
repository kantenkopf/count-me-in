import { initCounterNamespace } from '@/sockets/namespaces/counter.namespace';
import { getCounter, getCounterHistoy, setCounter } from '@/sockets/stores/counter.store';
import { Server, Namespace, Socket } from 'socket.io';

jest.mock('socket.io', () => {
  const mockNamespace = {
    on: jest.fn(),
    emit: jest.fn(),
  };

  const mockServer = {
    of: jest.fn(() => mockNamespace),
  };

  return {
    Server: jest.fn(() => mockServer),
    Namespace: jest.fn(),
    Socket: jest.fn(),
  };
});

jest.mock('@/sockets/stores/counter.store', () => ({
  getCounter: jest.fn(),
  getCounterHistoy: jest.fn(),
  setCounter: jest.fn(),
}));

describe('initCounterNamespace', () => {
  let io: Server;
  let namespace: Namespace;
  let socket: Socket;
  let connectionHandler: (socket: Socket) => void;

  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});

    io = new Server();
    namespace = io.of('/counter');
    socket = {
      id: 'mock-socket-id',
      on: jest.fn() as jest.Mock<any, any>,
      emit: jest.fn(),
    } as unknown as Socket;

    (namespace.on as jest.Mock).mockImplementation((event, handler) => {
      if (event === 'connection') {
        connectionHandler = handler;
      }
    });

    initCounterNamespace(io);
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  it('should initialize the /counter namespace', () => {
    initCounterNamespace(io);
    expect(io.of).toHaveBeenCalledWith('/counter');
    expect(namespace.on).toHaveBeenCalledWith('connection', expect.any(Function));
  });

  describe('connection event', () => {
    beforeEach(() => {
      connectionHandler(socket);
    });

    it('should log when a client connects', () => {
      expect(console.log).toHaveBeenCalledWith(
        'New client connected to /counter namespace.'
      );
    });

    it('should handle counter:get event', () => {
      (getCounter as jest.Mock).mockReturnValue(10);

      const getHandler = (socket.on as jest.Mock).mock.calls.find(
        (call: string[]) => call[0] === 'counter:get'
      )[1];
      getHandler();

      expect(getCounter).toHaveBeenCalled();
      expect(socket.emit).toHaveBeenCalledWith('counter:update', 10);
    });

    it('should handle counter:increment event', () => {
      (getCounter as jest.Mock).mockReturnValue(11);
      (getCounterHistoy as jest.Mock).mockReturnValue([10, 11]);

      const incrementHandler = (socket.on as jest.Mock).mock.calls.find(
        (call: string[]) => call[0] === 'counter:increment'
      )[1];
      incrementHandler();

      expect(setCounter).toHaveBeenCalled();
      expect(getCounterHistoy).toHaveBeenCalled();
      expect(namespace.emit).toHaveBeenCalledWith('counter:update', 11);
    });

    it('should handle error event', () => {
      const errorHandler = (socket.on as jest.Mock).mock.calls.find(
        (call: string[]) => call[0] === 'error'
      )[1];
      const mockError = new Error('Test error');
      errorHandler(mockError);

      expect(console.error).toHaveBeenCalledWith('Socket error:', mockError);
    });

    it('should handle disconnect event', () => {
      const disconnectHandler = (socket.on as jest.Mock).mock.calls.find(
        (call: string[]) => call[0] === 'disconnect'
      )[1];
      disconnectHandler();

      expect(console.log).toHaveBeenCalledWith(
        'mock-socket-id disconnected from /counter namespace.'
      );
    });
  });
});