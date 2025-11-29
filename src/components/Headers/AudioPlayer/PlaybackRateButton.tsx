type Props = {
  currentRate: number;
  playbackRate: number;
  setAudioPlaybackRate: (newRate: number) => void;
};

function PlaybackRateButton(props: Props) {
  const { currentRate, playbackRate, setAudioPlaybackRate } = props;

  return (
    <button
      type="button"
      className="grow items-center border border-gray-300 border-r-transparent bg-white px-4 py-2 text-sm font-medium text-gray-700 first:rounded-l-md last:rounded-r-md last:border-r-gray-300 hover:bg-gray-50 focus:z-10 focus:border-my-orange focus:outline-none focus:ring-1 focus:ring-my-orange dark:bg-dark-100 dark:text-gray-200 dark:hover:bg-dark-bg"
      style={{
        background:
          currentRate === playbackRate ? "rgba(255, 166, 0, 0.3)" : "",
      }}
      onClick={() => setAudioPlaybackRate(playbackRate)}
    >
      {playbackRate.toFixed(2)}x
    </button>
  );
}

export default PlaybackRateButton;
