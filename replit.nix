{pkgs}: {
deps = [
  pkgs.chromium
  pkgs.nodePackages.typescript-language-server
  pkgs.yarn
  pkgs.unzip
  pkgs.nodePackages.prettier
  pkgs.nodejs_latest
  pkgs.libuuid
  pkgs.imagemagick
];
env = { LD_LIBRARY_PATH = pkgs.lib.makeLibraryPath [pkgs.libuuid];  }; 
}
