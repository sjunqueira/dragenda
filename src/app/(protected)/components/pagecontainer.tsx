export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="m-2 w-full space-y-2">{children}</div>;
};

export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex w-full flex-col items-start gap-4 md:flex-row md:items-center md:justify-between md:space-x-6">
      {children}
    </div>
  );
};

export const PageHeaderContent = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="space-y-1 space-x-3 sm:flex-col">{children}</div>;
};

export const PageHeaderTitle = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="text-2xl font-bold">{children}</div>;
};

export const PageHeaderDescription = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="text-muted-foreground text-sm">{children}</div>;
};

export const PageHeaderActions = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="m-3 flex items-center gap-2">{children}</div>;
};

export const PageContent = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-6 mr-3 space-y-2">{children}</div>;
};
